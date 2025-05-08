import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataService } from './services/data.service';
import { DataController } from './controllers/data.controller';
import { StructuredDataSchema } from './models/structured-data.model';
import { LargeDataSchema } from './models/large-data.model';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nest-assessment'),
        MongooseModule.forFeature([
        { name: 'StructuredData', schema: StructuredDataSchema },
        { name: 'LargeData', schema: LargeDataSchema },
        ]),
    ],
    controllers: [DataController],
    providers: [DataService],
})


export class AppModule {}
