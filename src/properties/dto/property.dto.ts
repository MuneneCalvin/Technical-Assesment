import { ApiProperty } from '@nestjs/swagger';

export class PropertyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  source: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  country?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  isAvailable?: boolean;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false })
  priceSegment?: string;

  @ApiProperty()
  originalData: Record<string, any>;
}