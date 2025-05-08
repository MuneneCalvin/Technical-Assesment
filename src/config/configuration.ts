export default () => ({
    mongoUri: process.env.MONGO_URL || 'mongodb://localhost:27017/tech-assessment',
    ingestion: {
        sources: [
        'https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/structured_generated_data.json',
        'https://buenro-tech-assessment-materials.s3.eu-north-1.amazonaws.com/large_generated_data.json'
        ],
        batchSize: 1000,
    },
});