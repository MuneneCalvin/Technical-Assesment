import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Readable } from 'stream';

@Injectable()
export class S3DownloadService {
    async downloadJsonFromS3(url: string): Promise<any> {
        try {
        const response = await axios.get(url, {
            responseType: 'stream',
        });
        
        return new Promise((resolve, reject) => {
            const chunks: any[] = [];
            (response.data as Readable).on('data', (chunk) => chunks.push(chunk));
            (response.data as Readable).on('end', () => {
            try {
                const buffer = Buffer.concat(chunks);
                resolve(JSON.parse(buffer.toString()));
            } catch (error) {
                reject(error);
            }
            });
            (response.data as Readable).on('error', reject);
        });
        } catch (error) {
        throw new Error(`Failed to download JSON from S3: ${error.message}`);
        }
    }
}