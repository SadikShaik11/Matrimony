
/**
 * @module Coludinary
 * @author Sadik
 * @email : sadikshaik139@gmial.com
 * @description Cloudinary provides a secure and comprehensive API for easily uploading media files
 * provides 25 gb data for free tire 
 * 
 */

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import sharp from 'sharp';
import config from '../../config/config.js';
import logger from '../../config/logger.js';
cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_SECRET_KEY,
});


/**
 * @upload module
 * Folder name will be user's name+id 
 * 
 */

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',// Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'],  // Supported formats
    },
});



const MAX_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
const upload = multer({
    storage,
    limits: { fileSize: MAX_SIZE },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('File is not an image'), false);
        }
        cb(null, true);
    },
}).single('image');

const compressAndUpload = (req, res, next) => {
    logger.info("Inside compressAndUpload ")
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    sharp(req.file.buffer)
        .resize({ width: 1000, height: 1000, fit: sharp.fit.inside, withoutEnlargement: true })
        .toBuffer()
        .then(buffer => {
            req.file.buffer = buffer;
            next();
        })
        .catch(err => {
            res.status(500).json({ message: 'Image processing failed', error: err.message });
        });
    next()
};
export { upload, compressAndUpload };

