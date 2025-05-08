import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as StreamArray from 'stream-json/streamers/StreamArray';
import { parser } from 'stream-json';
import * as https from 'https';

@Injectable()
export class DataService {
    constructor(
        @InjectModel('StructuredData') private structuredModel: Model<any>,
        @InjectModel('LargeData') private largeModel: Model<any>,
    ) {}

    async ingestStructuredData() {
        const { data } = await axios.get(process.env.STRUCTURED_DATA_URL);
        await this.structuredModel.insertMany(data);
        return { message: 'Structured data ingested' };
    }

    async ingestLargeData() {
        const response = await axios({
        method: 'get',
        url: process.env.LARGE_DATA_URL,
        responseType: 'stream',
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });

        const pipeline = response.data.pipe(parser()).pipe(StreamArray.withParser());
        const bulk = [];

        for await (const { value } of pipeline) {
        bulk.push(value);
        if (bulk.length >= 1000) {
            await this.largeModel.insertMany(bulk);
            bulk.length = 0;
        }
        }

        if (bulk.length) {
        await this.largeModel.insertMany(bulk);
        }

        return { message: 'Large data ingested' };
    }

    async queryAll(filters: any) {
        const structured = await this.structuredModel.find(filters);
        const large = await this.largeModel.find(filters);
        return [...structured, ...large];
    }
}
