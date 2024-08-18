import Master from '../../config/Master.class.js';
import ApiError from '../../config/APIError.js';
import otpService from './otp.service.js';
import logger from '../../config/logger.js';

class OtpController extends Master {
    constructor() {
        super();
        Object.freeze(this);
    }

    // Send OTP to a user
    async sendOtp(req, res) {
        try {
            logger.info("inside OtpController:  sendOtp ")
            if (!req.body.receiverNumber) {
                this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'please send receiver number')
            }
            const response = await otpService.sendSMS(req.body.receiverNumber);
            res.status(this.HTTP_STATUS.CREATED).json(response);
        } catch (error) {
            console.log(error);
            this.logError("Error sending OTP:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }

    // Verify the OTP entered by the user
    async verifyOtp(req, res) {
        try {
            this.logInfo("OTP controller :inside verify otp")
            if (!req.body.otp || !req.body.otpId) {
                this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'otp and otpId are mandatory fields')
            }
            const response = await otpService.verifyOtp(req.body.otp, req.body.otpId);
            res.status(this.HTTP_STATUS.OK).json(response);
        } catch (error) {
            console.log(error);
            this.logError("Error verifying OTP:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }
}

export default new OtpController();
