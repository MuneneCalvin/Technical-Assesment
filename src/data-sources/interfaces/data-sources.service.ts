import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from '../common/schemas/property.schema';
import axios from 'axios';
import { Readable } from 'stream';
import { parse } from 'JSONStream';
import { pipeline } from 'stream/promises';

@Injectable()
export class DataSourcesService {
  private readonly logger = new Logger(DataSourcesService.name);

  constructor(
    @InjectModel(Property.name) private propertyModel: Model<Property>,
  ) {}

  async ingestDataFromSource(sourceUrl: string, sourceName: string) {
    try {
      this.logger.log(`Starting ingestion from ${sourceName}`);
      
      const response = await axios.get(sourceUrl, {
        responseType: 'stream',
      });

      const stream = response.data as Readable;

      // For small files, we can process in memory
      if (sourceUrl.includes('structured_generated_data')) {
        let data = '';
        for await (const chunk of stream) {
          data += chunk;
        }
        const jsonData = JSON.parse(data);
        await this.processBatch(jsonData, sourceName);
      } 
      // For large files, use streaming
      else {
        await this.processLargeFile(stream, sourceName);
      }

      this.logger.log(`Completed ingestion from ${sourceName}`);
    } catch (error) {
      this.logger.error(`Error ingesting data from ${sourceName}: ${error.message}`);
    }
  }

  private async processLargeFile(stream: Readable, sourceName: string) {
    const batchSize = 1000;
    let batch: any[] = [];

    const transformStream = parse('*');
    
    await pipeline(
      stream,
      transformStream,
      async (source) => {
        for await (const data of source) {
          batch.push(data);
          if (batch.length >= batchSize) {
            await this.processBatch(batch, sourceName);
            batch = [];
          }
        }
        // Process remaining items
        if (batch.length > 0) {
          await this.processBatch(batch, sourceName);
        }
      }
    );
  }

  private async processBatch(batch: any[], sourceName: string) {
    try {
      const operations = batch.map(item => {
        const normalized = this.normalizeData(item, sourceName);
        return {
          updateOne: {
            filter: { originalId: `${sourceName}-${normalized.originalId}` },
            update: { $set: normalized },
            upsert: true,
          },
        };
      });

      await this.propertyModel.bulkWrite(operations);
    } catch (error) {
      this.logger.error(`Error processing batch: ${error.message}`);
    }
  }

  private normalizeData(data: any, sourceName: string): Partial<Property> {
    const normalized: Partial<Property> = {
      originalId: `${sourceName}-${data.id}`,
      source: sourceName,
      originalData: data,
    };

    // Normalize fields from different sources
    if (sourceName === 'structured') {
      normalized.name = data.name;
      normalized.country = data.address?.country;
      normalized.city = data.address?.city;
      normalized.isAvailable = data.isAvailable;
      normalized.priceForNight = data.priceForNight;
    } else if (sourceName === 'large') {
      normalized.city = data.city;
      normalized.availability = data.availability;
      normalized.pricePerNight = data.pricePerNight;
      normalized.priceSegment = data.priceSegment;
      
      // Map availability to isAvailable for unified querying
      normalized.isAvailable = data.availability;
    }

    return normalized;
  }
}