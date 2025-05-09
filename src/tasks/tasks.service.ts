import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { DataSourcesService } from '../data-sources/data-sources.service';

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private dataSourcesService: DataSourcesService,
  ) {}

  onModuleInit() {
    this.scheduleDataIngestion();
  }

  private scheduleDataIngestion() {
    // Run every hour
    const ingestionInterval = setInterval(() => {
      this.ingestAllSources();
    }, 60 * 60 * 1000);

    this.schedulerRegistry.addInterval('data-ingestion', ingestionInterval);

    // Initial ingestion
    this.ingestAllSources();
  }

  private async ingestAllSources() {
    try {
      await Promise.all([
        this.dataSourcesService.ingestDataFromSource(
          'https://buenro-tech-assessment-materials.s3.eu-north1.amazonaws.com/structured_generated_data.json',
          'structured',
        ),
        this.dataSourcesService.ingestDataFromSource(
          'https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/large_generated_data.json',
          'large',
        ),
      ]);
    } catch (error) {
      console.error('Error ingesting data:', error);
    }
  }
}