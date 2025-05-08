import { Schema } from 'mongoose';

export const LargeDataSchema = new Schema({
    id: { type: String, required: true, unique: true },
    city: { type: String },
    availability: { type: Boolean },
    priceSegment: {
        type: String,
        enum: ['high', 'medium', 'low'],
    },
    pricePerNight: { type: Number },
});
