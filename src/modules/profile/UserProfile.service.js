import { databaseCodes, DatabaseConnections } from "../../../server.js";
import config from "../../config/config.js";
import Master from "../../config/Master.class.js";
import { DB_MODEL_CONSTANTS, LANG_CONSTANTS } from "../../Models.js";
import { LanguageModel } from "../../global/global.model.js";
import { request } from "express";

/***
 * @module UserProfileService
 * @description Contains all the logic related to user profile creation and updates (bride/groom)
 */
class UserProfileService extends Master {
    constructor() {
        super();
        Object.freeze(this);
    }

    /**
     * Create a new user profile (bride/groom)
     * @param {Object} profileObj - The profile data
     * @returns {Object} - Created profile data
     */
    async createUserProfile(req, profileObj) {
        try {
            this.logger.info("UserProfileService: Inside createUserProfile Method");

            const databaseConnection = DatabaseConnections[req.user.region];
            if (!databaseConnection) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Database connection not found with the code');
            }

            const UserProfile = DB_MODEL_CONSTANTS.USER_PROFILE_MODEL(databaseConnection);
            const existingProfile = await UserProfile.findOne({ email: profileObj.email });

            if (existingProfile) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Profile with this email already exists');
            }

            const regionId = await LanguageModel.findOne({ code: req.user.region });
            if (!regionId) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Invalid region code');
            }

            profileObj.regionId = regionId._id;
            profileObj.accountId = req.user.id;

            const data = await UserProfile.create(profileObj);

            return { message: 'Profile created successfully', data: { profileId: data._id } };
        } catch (error) {
            this.logError("UserProfileService: Error in createUserProfile", error);
            throw error;
        }
    }

    /**
     * Update an existing user profile (bride/groom)
     * @param {String} profileId - The profile ID
     * @param {Object} updateObj - The update data
     * @returns {Object} - Updated profile data
     */
    async updateUserProfile(req, profileId) {
        try {
            this.logger.info("UserProfileService: Inside updateUserProfile Method");

            const databaseConnection = DatabaseConnections[req.user.region];
            if (!profileId || !req.body) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'please send profileId and updateObj');
            }

            if (!databaseConnection) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Database connection not found with the code');
            }

            const UserProfile = DB_MODEL_CONSTANTS.USER_PROFILE_MODEL(databaseConnection);
            const existingProfile = await UserProfile.findById(profileId);

            if (!existingProfile) {
                throw this.API_ERROR(this.HTTP_STATUS.NOT_FOUND, 'Profile not found');
            }

            // Update the profile with the new data
            const updatedProfile = await UserProfile.findByIdAndUpdate(profileId, req.body, { new: true });

            return { message: 'Profile updated successfully', data: updatedProfile };
        } catch (error) {
            this.logError("UserProfileService: Error in updateUserProfile", error);
            throw error;
        }
    }

    async getUserProfileById(profileId, req) {
        try {
            this.logger.info("UserProfileService: Inside getUserProfileById Method");

            const databaseConnection = DatabaseConnections[req.user.region];
            if (!databaseConnection) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Database connection not found with the code');
            }

            const UserProfile = DB_MODEL_CONSTANTS.USER_PROFILE_MODEL(databaseConnection);
            const userProfile = await UserProfile.findById(profileId);

            if (!userProfile) {
                throw this.API_ERROR(this.HTTP_STATUS.NOT_FOUND, 'Profile not found');
            }

            return { message: 'Profile retrieved successfully', data: userProfile };
        } catch (error) {
            this.logError("UserProfileService: Error in getUserProfileById", error);
            throw error;
        }
    }

    async searchInUserProfiles(req) {
        try {
            const databaseConnection = DatabaseConnections[req.user.region];
            const UserProfile = DB_MODEL_CONSTANTS.USER_PROFILE_MODEL(databaseConnection);

            const searchQuery = {
                $or: []
            };

            const keyword = req.query.keyword ? String(req.query.keyword).trim() : '';

            if (keyword) {
                searchQuery.$or.push(
                    { 'personalInfo.fullName': { $regex: `${keyword}`, $options: 'i' } },
                    { 'personalInfo.gender': { $regex: `${keyword}`, $options: 'i' } },
                    { 'lifestyleInfo.hobbies': { $elemMatch: { $regex: `${keyword}`, $options: 'i' } } },
                    { 'religiousInfo.religion': { $regex: `${keyword}`, $options: 'i' } },
                    { 'religiousInfo.caste': { $regex: `${keyword}`, $options: 'i' } },
                    { 'contactInfo.address.country': { $regex: `${keyword}`, $options: 'i' } },
                    { 'contactInfo.address.state': { $regex: `${keyword}`, $options: 'i' } },
                    { 'contactInfo.address.city': { $regex: `${keyword}`, $options: 'i' } },
                    { 'lifestyleInfo.diet': { $regex: `${keyword}`, $options: 'i' } }
                );

                if (keyword.toLowerCase() === 'true' || keyword.toLowerCase() === 'false') {
                    searchQuery.$or.push(
                        { 'lifestyleInfo.smoking': keyword.toLowerCase() === 'true' },
                        { 'lifestyleInfo.drinking': keyword.toLowerCase() === 'true' }
                    );
                }
            }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;


            const userProfiles = await UserProfile.find(searchQuery).skip(skip).limit(limit);

            if (!userProfiles.length) {
                return { message: 'No profiles found matching your criteria' };
            }

            return { message: 'Profiles retrieved successfully', data: userProfiles };

        } catch (error) {
            this.logError("UserProfileService: Error in getUserProfileById", error);
            throw error;
        }
    }

}

export default new UserProfileService();
