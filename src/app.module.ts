import { Module } from '@nestjs/common';
import { PropertiesModule } from './properties/properties.module';
import { TasksModule } from './tasks/tasks.module';
import { DataSourcesModule } from './data-sources/data-sources.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/property_db'),
    PropertiesModule,
    TasksModule,
    DataSourcesModule,
  ],
})
export class AppModule {}