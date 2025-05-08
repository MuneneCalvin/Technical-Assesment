import { Schema } from 'mongoose';

export const StructuredDataSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: {
        country: { type: String },
        city: { type: String },
    },
    isAvailable: { type: Boolean },
    priceForNight: { type: Number },
});
