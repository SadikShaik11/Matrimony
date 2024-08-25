import { DatabaseConnections } from "../../../server.js";
import { DB_MODEL_CONSTANTS } from "../../Models.js";
import Master from "../../config/Master.class.js";
import { upload, compressAndUpload } from "./ImgConfig.js";
/**
 * @module ImageUpload
 */
class ImageUpload extends Master {

    constructor() {
        super()
    }
    async ImageUpload(req, res) {
        try {
            // First, compress the image
            this.logInfo('ImageUpload service : Image Upload')
            // Check if a file was uploaded
            if (!req.file) {
                return res.status(this.HTTP_STATUS.BAD_REQUEST).json({ message: 'No file uploaded' });
            }

            console.log(req.file);

            // Save the image data to the database
            const databaseConnection = DatabaseConnections[req.user.region];
            const ImageModel = DB_MODEL_CONSTANTS.IMAGE_MODEL(databaseConnection);

            // Assuming you have the logic to save image data in ImageModel
            const newImage = new ImageModel({
                imageUrl: req.file.path,
                // regionId: req.user.regionId,
                userId: req.user.id,
                imageType: req.query.type ? req.query.type : 'avatar'
            });

            await newImage.save();

            // Successfully uploaded
            res.status(this.HTTP_STATUS.OK).json({
                message: 'Image uploaded successfully!',
                data: newImage
            });
        } catch (err) {
            // Handle any errors
            res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: 'Image upload failed!',
                error: err.message,
            });
        }
    }

}

export default new ImageUpload()