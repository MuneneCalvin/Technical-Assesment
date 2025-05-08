import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import mongoose from 'mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
        isGlobal: true,
        }),
        MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
            const uri = configService.get<string>('mongoUrl');
            mongoose.connection.on('connected', () => {
                console.log(`Successfully connected to MongoDB at ${uri}`);
            });
            mongoose.connection.on('error', (err) => {
              console.error(`MongoDB connection error: ${err.message}`);
            });
          
            mongoose.connection.on('disconnected', () => {
              console.warn('MongoDB connection disconnected');
            });
          
            return {
              uri,
            };
          },
        inject: [ConfigService],
        }),
        ScheduleModule.forRoot(),
    ],
})


export class AppModule {}