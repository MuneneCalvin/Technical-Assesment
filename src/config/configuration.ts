export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    mongoUrl: process.env.MONGO_URL,
    ingestion: {
        sources: [
            process.env.STRUCTURED_DATA_URL,
            process.env.LARGE_DATA_URL,
        ],
        batchSize: 1000,
    },
});