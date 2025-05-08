import { Injectable, Logger } from '@nestjs/common';
import { S3DownloadService } from '../services/s3-download.service';
import { UnifiedDataService } from '../../data/services/unified-data.service';

@Injectable()
export class DataIngestionJob {
    private readonly logger = new Logger(DataIngestionJob.name);
    private readonly SOURCES = [
        'https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/structured_generated_data.json',
        'https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/large_generated_data.json'
    ];

    constructor(
        private readonly s3DownloadService: S3DownloadService,
        private readonly unifiedDataService: UnifiedDataService,
    ) {}

    async run(): Promise<void> {
        this.logger.log('Starting data ingestion job');
        
        try {
        for (const source of this.SOURCES) {
            this.logger.log(`Processing source: ${source}`);
            const data = await this.s3DownloadService.downloadJsonFromS3(source);
            await this.unifiedDataService.processAndStoreData(data, source);
        }
        
        this.logger.log('Data ingestion job completed successfully');
        } catch (error) {
        this.logger.error(`Data ingestion job failed: ${error.message}`);
        throw error;
        }
    }
}