import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Property extends Document {
  @Prop({ required: true, unique: true })
  originalId: string;

  @Prop({ required: true })
  source: string;

  @Prop()
  name?: string;

  @Prop()
  country?: string;

  @Prop()
  city?: string;

  @Prop()
  isAvailable?: boolean;

  @Prop()
  availability?: boolean;

  @Prop()
  priceForNight?: number;

  @Prop()
  pricePerNight?: number;

  @Prop()
  priceSegment?: string;

  @Prop({ type: Object })
  originalData: Record<string, any>;
}

export const PropertySchema = SchemaFactory.createForClass(Property);

// Create indexes for frequently queried fields
PropertySchema.index({ city: 1 });
PropertySchema.index({ country: 1 });
PropertySchema.index({ isAvailable: 1 });
PropertySchema.index({ priceForNight: 1 });
PropertySchema.index({ pricePerNight: 1 });