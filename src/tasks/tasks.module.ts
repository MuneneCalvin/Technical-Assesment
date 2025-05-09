import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DataSourcesModule } from '../data-sources/data-sources.module';

@Module({
  imports: [ScheduleModule.forRoot(), DataSourcesModule],
  providers: [TasksService],
})
export class TasksModule {}