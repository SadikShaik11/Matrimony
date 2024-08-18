
import { databaseCodes, DatabaseConnections } from "../../../server.js";
import config from "../../config/config.js";
import Master from "../../config/Master.class.js";
import { userModel } from "./Users.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DB_CONSTANTS, LANG_CONSTANTS } from "../../Models.js";

/***
 * @module userService
 * description: contains all the logic related to user login signup 
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
            const databaseConnection = userObj.code

            const User = userModel(databaseConnection)
            const user = await User.findOne({ email: userObj.email })
            console.log(user)
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
            const user = await userModel.findOne({ email: loginDetails.email });
            if (!user) {
                throw this.API_ERROR(this.HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');
            }
            const isPasswordValid = bcrypt.compareSync(loginDetails.password, user.password);
            if (!isPasswordValid) {
                throw this.API_ERROR(this.HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');
            }
            const token = jwt.sign({ userId: user._id },
                config.JWT_SECRET,
                { expiresIn: config.tokenExpiry },
                { algorithm: 'RS256' });

            const userResponse = {
                _id: user._id,
                email: user.email,
            };

            return {
                message: "login successful !",
                data: { token, user: userResponse }
            };
        } catch (error) {
            console.log(error)
            this.logError("UserService: Error in login", error);
            throw error;
        }
    }
}

export default new UsersService()