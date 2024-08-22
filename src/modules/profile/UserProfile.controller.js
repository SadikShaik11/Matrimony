import Master from '../../config/Master.class.js';
import UserProfileService from './UserProfile.service.js';
import ApiError from '../../config/APIError.js';

class UserProfileController extends Master {
    constructor() {
        super();
        Object.freeze(this);
    }

    // Create a new user profile (bride/groom)
    async createUserProfile(req, res) {
        try {
            this.logger.info("UserProfileController: Inside createUserProfile Method");
            const response = await UserProfileService.createUserProfile(req, req.body);
            res.status(this.HTTP_STATUS.CREATED).json(response);
        } catch (error) {

            this.logError("Error creating user profile:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

    // Update an existing user profile (bride/groom)
    async updateUserProfile(req, res) {
        try {
            this.logger.info("UserProfileController: Inside updateUserProfile Method");
            const { profileId } = req.params;
            const response = await UserProfileService.updateUserProfile(req, profileId);
            res.status(this.HTTP_STATUS.OK).json(response);
        } catch (error) {

            this.logError("Error updating user profile:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

    async getUserProfileById(req, res) {
        try {
            this.logger.info("UserProfileController: Inside getUserProfileById Method");
            const { profileId } = req.params;
            const response = await UserProfileService.getUserProfileById(profileId, req);
            res.status(this.HTTP_STATUS.OK).json(response);
        } catch (error) {

            this.logError("Error retrieving user profile:", error);

            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

    async searchInUserProfiles(req, res) {
        try {
            this.logger.info("UserProfileController: Inside searchInUserProfile Method");
            const response = await UserProfileService.searchInUserProfiles(req);
            res.status(this.HTTP_STATUS.OK).json(response);
        } catch (error) {

            this.logError("Error searching user profiles", error);

            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

}

export default new UserProfileController();
