import mongoose from 'mongoose';
import app from './index.js';
import config from './src/config/config.js';
import logger from './src/config/logger.js';
import { DB_MODEL_CONSTANTS } from './src/Models.js';

let server;

export let DatabaseConnections = {}

export const databaseCodes = {}

const connectToDatabases = async () => {
    try {
        let masterDb = await mongoose.connect(config.mongoose.url + 'master', config.mongoose.options);
        logger.info(`Connected to master database \n URL :: ${config.mongoose.url}`);

        // Fetch tenant databases
        const tenant_dbs = await DB_MODEL_CONSTANTS.LANGUAGE_MODEL.find();
        DatabaseConnections['gl'] = masterDb
        databaseCodes['global'] = 'gl'
        await Promise.all(
            tenant_dbs.map(async (language) => {
                try {
                    const dbUrl = `${config.mongoose.url}${language.code}`;
                    const db = await mongoose.createConnection(dbUrl, config.mongoose.options);
                    DatabaseConnections[language.code] = db
                    databaseCodes[language.language] = language.code
                    logger.info(`Connected to database ${language.code}`);
                } catch (err) {
                    logger.error(`Error connecting to database ${language.code}: ${err.message}`);
                }
            })
        );

        server = app.listen(config.port, () => {
            logger.info(`Listening to port ${config.port}`);
        });

    } catch (err) {
        logger.error(`Error during database connections: ${err.message}`);
        process.exit(1);
    }
};

connectToDatabases();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
