import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnifiedData } from '../entities/unified-data.entity';

@Injectable()
export class UnifiedDataService {
    constructor(
        @InjectModel(UnifiedData.name)
        private readonly unifiedDataModel: Model<UnifiedData>,
    ) {}

    async processAndStoreData(data: any, source: string): Promise<void> {
        try {
        // For large datasets, process in batches
        if (Array.isArray(data)) {
            const batchSize = 1000;
            for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);
            await this.processBatch(batch, source);
            }
        } else {
            await this.unifiedDataModel.create({
            data,
            source,
            });
        }
        } catch (error) {
        throw new Error(`Failed to process and store data: ${error.message}`);
        }
    }

    private async processBatch(batch: any[], source: string): Promise<void> {
        const operations = batch.map(item => ({
        insertOne: {
            document: {
            data: item,
            source,
            },
        },
        }));

        await this.unifiedDataModel.bulkWrite(operations);
    }
}