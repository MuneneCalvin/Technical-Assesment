import { Document } from 'mongoose';

export interface Property extends Document {
  originalId: string;
  source: string;
  name?: string;
  country?: string;
  city?: string;
  isAvailable?: boolean;
  availability?: boolean;
  priceForNight?: number;
  pricePerNight?: number;
  priceSegment?: string;
  originalData: Record<string, any>;
}