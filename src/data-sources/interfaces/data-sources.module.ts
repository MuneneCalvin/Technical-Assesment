import { Module } from '@nestjs/common';
import { DataSourcesService } from './data-sources.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from '../common/schemas/property.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }]),
  ],
  providers: [DataSourcesService],
  exports: [DataSourcesService],
})
export class DataSourcesModule {}