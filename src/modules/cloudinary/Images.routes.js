
/**
 * @module IMAGES router
 * @author : sadik 
 * @email : sadikshaik139@gmial.com
 */
import { Router } from 'express'
import catchAsync from "../../config/catchAsync.js"
import validate from '../../config/validation.js'
import { authMiddleware } from '../../middlewares/Auth.middleware.js'
import ImageUploadService from './ImageUpload.service.js'
import { compressAndUpload, upload } from './ImgConfig.js'


const router = Router()

router.post('/upload', authMiddleware, upload, (req, res) => ImageUploadService.ImageUpload(req, res));
export default router