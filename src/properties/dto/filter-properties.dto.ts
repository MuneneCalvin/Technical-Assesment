import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterPropertiesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsString()
  priceSegment?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  offset?: number;
}