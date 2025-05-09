import { Controller, Get, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { FilterPropertiesDto } from './dto/filter-properties.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  async findAll(@Query() filterPropertiesDto: FilterPropertiesDto) {
    return this.propertiesService.findAll(filterPropertiesDto);
  }
}