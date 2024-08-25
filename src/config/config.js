import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
// Load the environment variables from the .env file
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Define the schema for your environment variables
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    PROD_DB: Joi.string().description('Mongo DB url production'),
    FAST_2_SMS_URL: Joi.string(),
    FAST_2_SMS_KEY: Joi.string(),
    JWT_SECRET: Joi.string(),
    TOKEN_EXPIRY: Joi.string(),
    CLOUDINARY_SECRET_KEY: Joi.string(),
    CLOUDINARY_API_KEY: Joi.string(),
    CLOUDINARY_CLOUD_NAME: Joi.string(),

    // Add other variables as needed
}).unknown();

// Validate the environment variables against the schema
const { error, value: envVars } = envVarsSchema.validate(process.env);

// Throw an error if validation fails
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
// Export the validated configurations
const DB_URL = (envVars.NODE_ENV == 'production') ? envVars.PROD_DB : envVars.MONGODB_URL
export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    saltRounds: envVars.SALT_ROUNDS,
    tokenExpiry: envVars.TOKEN_EXPIRY,
    JWT_SECRET: envVars.JWT_SECRET,
    FAST_2_SMS_URL: envVars.FAST_2_SMS_URL,
    FAST_2_SMS_KEY: envVars.FAST_2_SMS_KEY,
    CLOUDINARY_SECRET_KEY: envVars.CLOUDINARY_SECRET_KEY,
    CLOUDINARY_API_KEY: envVars.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: envVars.CLOUDINARY_CLOUD_NAME,
    mongoose: {
        url: DB_URL,
        options: {
            //  useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
    },
};
