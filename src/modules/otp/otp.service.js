import axios from "axios";
import Master from "../../config/Master.class.js";
import config from "../../config/config.js";

import { DB_MODEL_CONSTANTS, LANG_CONSTANTS } from "../../Models.js";
import { DatabaseConnections } from "../../../server.js";

class SMS extends Master {

    constructor() {
        super()
    }
    /**
     * module : otp module
     * @param {*} receiverNumber 
     */
    async sendSMS(receiverNumber) {
        try {
            this.logger.info("inside otp module : sendSMS service");


            const OTP = Math.floor(100000 + Math.random() * 900000);
            const OTPID = 'OTP-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
            Math.floor(100000 + Math.random() * 900000);
            const response = await axios.post(config.FAST_2_SMS_URL, null, {
                headers: {
                    authorization: config.FAST_2_SMS_KEY,
                },
                params: {
                    "message": `This is your otp for the login into matrimony website ${OTP}, OTP will be expired in 5 minutes or 300 seconds !`,
                    "language": "english",
                    "route": "q",
                    "numbers": receiverNumber
                },
            });

            const DbConnection = DB_MODEL_CONSTANTS.OTP_MODEL(DatabaseConnections[LANG_CONSTANTS.GLOBAL])
            const otpResponse = await DbConnection.create({
                otp: OTP,
                otpId: OTPID,
                phoneNumber: receiverNumber,
            })


            return { message: 'otp sent successful !', otpId: OTPID }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Status code:', error.response.status);
                return error.response.data
            } else if (error.request) {
                // No response was received
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
            return error.message
        }
    };
    async verifyOtp(otp, OTPid) {
        try {
            this.logger.info("inside otp module : verify otp service");
            const DbConnection = DB_MODEL_CONSTANTS.OTP_MODEL(DatabaseConnections[LANG_CONSTANTS.GLOBAL])
            const savedOTP = await DbConnection.findOne({
                otp: otp,
                otpId: OTPid,
            })
            if (savedOTP?.otpId == OTPid) {
                await DbConnection.updateOne({})
                return { success: true, message: 'Otp verification is successful' }
            } else if (!savedOTP) {
                return { success: true, message: 'Otp is expired' }
            }
            return { success: false, message: 'Otp verification is failed ! ' }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Status code:', error.response.status);
                return error.response.data
            } else if (error.request) {
                // No response was received
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
            return error.message
        }
    }
}

export default new SMS()