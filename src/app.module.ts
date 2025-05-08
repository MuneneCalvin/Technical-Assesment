import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { IngestionModule } from './ingestion/ingestion.module';
import { DataModule } from './data/data.module';
import { ApiModule } from './api/api.module';

@Module({
    imports: [
        ConfigModule.forRoot({
        isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/tech-assessment'),
        ScheduleModule.forRoot(),
        IngestionModule,
        DataModule,
        ApiModule,
    ],
})
export class AppModule {}