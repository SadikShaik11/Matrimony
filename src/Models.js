import { userModel } from "./modules/users/Users.model.js";
import { LanguageModel } from "./global/global.model.js";
import { OtpModel } from "./modules/otp/otp.model.js";
import { userProfileModel } from "./modules/profile/UserProfile.model.js";
import { imageModel } from "./modules/cloudinary/Images.model.js";
export const LANG_CONSTANTS = {
    "GLOBAL": "gl",
    "HINDI": "hi",
    "BENGALI": "bn",
    "TELUGU": "te",
    "MARATHI": "mr",
    "TAMIL": "ta",
    "GUJARATI": "gu",
    "MALAYALAM": "ml",
    "KANNADA": "kn",
    "ODIA": "or",
    "PUNJABI": "pa",

}


export const DB_MODEL_CONSTANTS = {
    USER_MODEL: userModel,
    LANGUAGE_MODEL: LanguageModel,
    OTP_MODEL: OtpModel,
    USER_PROFILE_MODEL: userProfileModel,
    IMAGE_MODEL: imageModel

}

export default [userModel, LanguageModel]