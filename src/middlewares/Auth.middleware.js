import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import ApiError from '../config/APIError.js';
import { DB_MODEL_CONSTANTS, LANG_CONSTANTS } from '../Models.js';
import { DatabaseConnections } from '../../server.js';
import mongoose from 'mongoose';
import { HttpStatusCode } from 'axios';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

        if (!token) {
            throw new ApiError(HttpStatusCode.Forbidden, 'Access token is missing');
        }

        // Verify the token
        const decoded = jwt.verify(token, config.JWT_SECRET);


        const userModel = DB_MODEL_CONSTANTS.USER_MODEL(DatabaseConnections[decoded.region]);
        const userDetails = await userModel.findById(decoded.userId);

        if (!userDetails || !userDetails._id) {
            throw new ApiError(HttpStatusCode.Forbidden, 'User invalid!');
        }

        // if user invalid
        if (!userDetails._id.equals(decoded.userId)) {
            throw new ApiError(HttpStatusCode.Forbidden, 'User invalid!');
        }

        req.user = {
            id: decoded.userId,
            regionId: decoded.regionId,
            region: decoded.region
        };

        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        if (error instanceof jwt.JsonWebTokenError) {
            // Invalid token
            return res.status(403).json({ error: 'Invalid token' });
        }
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        // Internal Server Error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { authMiddleware };
