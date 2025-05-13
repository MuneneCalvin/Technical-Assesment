import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from '../common/schemas/property.schema';
import { FilterPropertiesDto } from './dto/filter-properties.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}

  async findAll(filterPropertiesDto: FilterPropertiesDto) {
    const {
      name,
      country,
      city,
      isAvailable,
      minPrice,
      maxPrice,
      priceSegment,
      limit = 100,
      offset = 0,
    } = filterPropertiesDto;

    const query: any = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable;
    }

    if (priceSegment) {
      query.priceSegment = priceSegment;
    }

    // Handle price range (check both possible price fields)
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.$or = [
        { priceForNight: this.buildPriceRange(minPrice, maxPrice) },
        { pricePerNight: this.buildPriceRange(minPrice, maxPrice) },
      ];
    }

    return this.propertyModel
      .find(query)
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();
  }

  private buildPriceRange(minPrice?: number, maxPrice?: number) {
    const range: any = {};
    if (minPrice !== undefined) range.$gte = minPrice;
    if (maxPrice !== undefined) range.$lte = maxPrice;
    return range;
  }
}