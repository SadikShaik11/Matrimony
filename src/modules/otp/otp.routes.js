import { Router } from 'express'
import catchAsync from "../../config/catchAsync.js"
import otpController from './otp.controller.js'
const router = Router()


/**
 * 
 * @ OTP 
 * @description : sending otp
 * @author : sadik 
 * @email : sadikshaik139@gmial.com
 */
router.post("/sendOtp", (req, res) => catchAsync(otpController.sendOtp(req, res)))
router.post("/verifyOtp", (req, res) => catchAsync(otpController.verifyOtp(req, res)))

export default router