import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    refreshToken: {
        type: String
    },
    code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'languages'
    }
});

const userModel = (connection) => {
    return connection.model('user', userSchema);
};
export {
    userModel,
};
