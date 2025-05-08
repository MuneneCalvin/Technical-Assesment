import { IsOptional, IsObject } from 'class-validator';

export class QueryDataDto {
    @IsOptional()
    @IsObject()
    filters?: Record<string, any>;

    @IsOptional()
    limit?: number;

    @IsOptional()
    skip?: number;
}