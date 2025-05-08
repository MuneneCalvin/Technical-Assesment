import { Controller, Get, Query } from '@nestjs/common';
import { UnifiedDataService } from '../../data/services/unified-data.service';
import { QueryDataDto } from '../../data/dtos/query-data.dto';

@Controller('api/data')
export class DataController {
    constructor(private readonly unifiedDataService: UnifiedDataService) {}

    @Get()
    async getData(@Query() query: QueryDataDto) {
        const { filters = {}, limit = 100, skip = 0 } = query;
        
        const queryConditions = {};
        for (const [key, value] of Object.entries(filters)) {
        queryConditions[`data.${key}`] = value;
        }

        const data = await this.unifiedDataService.find(queryConditions, limit, skip);
        const total = await this.unifiedDataService.count(queryConditions);

        return {
        data,
        meta: {
            total,
            limit,
            skip,
        },
        };
    }
}