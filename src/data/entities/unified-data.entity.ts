import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UnifiedData extends Document {
    @Prop({ required: true, type: Object })
    data: any;

    @Prop({ required: true })
    source: string;

    @Prop({ type: Date, default: Date.now })
    ingestedAt: Date;
}

export const UnifiedDataSchema = SchemaFactory.createForClass(UnifiedData);

// Add indexes for efficient querying
UnifiedDataSchema.index({ 'data.id': 1 });
UnifiedDataSchema.index({ 'data.timestamp': 1 });
UnifiedDataSchema.index({ 'data.category': 1 });
UnifiedDataSchema.index({ source: 1 });