import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    otpId: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // expires: 300, enable it in production environment
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const OtpModel = (connection) => {
    return connection.model('Otp', OtpSchema);
};
export { OtpModel }
