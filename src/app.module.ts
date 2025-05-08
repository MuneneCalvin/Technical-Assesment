import { Module, Logger } from '@nestjs/common';
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
            const logger = new Logger('MongoDB');
            const uri = configService.get<string>('MONGO_URL');

            mongoose.connection.on('connected', () => {
                logger.log(`Successfully connected to MongoDB`);
            });

            return {
            uri,
            connectionFactory: (connection) => {
                logger.log('Connected to MongoDB 🙌🏽💯');
                return connection;
            },
            };
        },
        inject: [ConfigService],
        }),
        ScheduleModule.forRoot(),
    ],
})
export class AppModule {}