import { userModel } from "./modules/users/Users.model.js";
import { LanguageModel } from "./global/global.model.js";
import { OtpModel } from "./modules/otp/otp.model.js";
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


export const DB_CONSTANTS = {
    USER_MODEL: userModel,
    LANGUAGE_MODEL: LanguageModel,
    OTP_MODEL: OtpModel
}

export default [userModel, LanguageModel]