
/**
 * @module userProfile router
 * @author : sadik 
 * @email : sadikshaik139@gmial.com
 */
import { Router } from 'express'
import catchAsync from "../../config/catchAsync.js"
import { createUserProfileValidation, updateUserProfileValidation } from './UserProfile.validation.js'
import UserProfileController from './UserProfile.controller.js'
import validate from '../../config/validation.js'
import { authMiddleware } from '../../middlewares/Auth.middleware.js'
const router = Router()

/**
 * 
 * @ Create user profile 
 * @description : signing up a new user account
 * 
 */
router.post("/create", authMiddleware,
    validate(createUserProfileValidation),
    (req, res) => catchAsync(UserProfileController.createUserProfile(req, res)))

router.post("/update/:profileId", authMiddleware,
    validate(updateUserProfileValidation),
    (req, res) => catchAsync(UserProfileController.updateUserProfile(req, res)))
/**
 * 
 * @param {String}
 * @module Search Service
 */
router.get("/search", authMiddleware,
    (req, res) => catchAsync(UserProfileController.searchInUserProfiles(req, res)))

router.get("/:profileId", authMiddleware,
    (req, res) => catchAsync(UserProfileController.getUserProfileById(req, res)))
export default router