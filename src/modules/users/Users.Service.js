
import { databaseCodes, DatabaseConnections } from "../../../server.js";
import config from "../../config/config.js";
import Master from "../../config/Master.class.js";
import { userModel } from "./Users.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DB_MODEL_CONSTANTS, LANG_CONSTANTS } from "../../Models.js";
import { LanguageModel } from "../../global/global.model.js";


/***
 * @module userService
 * description : contains all the logic related to user login signup 
 */
class UsersService extends Master {
    constructor() {
        super()
        Object.freeze(this);
    }
    async signUp(userObj) {
        try {
            this.logger.info("UserService: Inside signUp Method");
            if (!userObj.code) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'account code is mandatory ')
            }
            if (userObj.password != userObj.confirmPassword) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'password and confirm password is not matching')
            }

            if (!userObj.code) userObj.code = LANG_CONSTANTS.GLOBAL
            const databaseConnection = DatabaseConnections[userObj.code]
            if (!databaseConnection) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'database connection not found with the code')
            }
            const User = userModel(databaseConnection)
            const user = await User.findOne({ email: userObj.email })
            const regionId = await LanguageModel.findOne({ code: userObj.code })
            /**
             * inserting region id 
             */
            if (!regionId) throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'invalid code !')
            userObj.regionId = regionId._id
            if (user) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'user account already exists !')
            }
            const hashedPassword = bcrypt.hashSync(userObj.password, 10);
            userObj.password = hashedPassword

            const data = await User.create(userObj)

            return { message: 'user created successfully', data }
        } catch (error) {
            this.logError("UserService: Error in signUp", error);
            throw error
        }
    }
    async loginUser(loginDetails) {
        try {
            this.logger.info("UserService: Inside login Method");

            const userModel = DB_MODEL_CONSTANTS.USER_MODEL(DatabaseConnections[loginDetails.region]);
            const regionId = await LanguageModel.findOne({ code: loginDetails.region });


            const user = await userModel.findOne({ email: loginDetails.email, regionId: regionId._id });


            if (!user) {
                throw this.API_ERROR(this.HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials , invalid username.');
            }

            const isPasswordValid = bcrypt.compareSync(loginDetails.password, user.password);
            if (!isPasswordValid) {
                throw this.API_ERROR(this.HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials , invalid password.');
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    regionId: regionId._id,
                    region: regionId.code
                },
                config.JWT_SECRET,
                {
                    expiresIn: config.tokenExpiry,
                }
            );

            const userResponse = {
                _id: user._id,
                email: user.email,
            };

            return {
                message: "login successful!",
                data: { token, user: userResponse }
            };
        } catch (error) {

            this.logError("UserService: Error in login", error);
            throw error;
        }

    }
}

export default new UsersService()