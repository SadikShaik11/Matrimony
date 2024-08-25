import Router from 'express'
import UserRoutes from '../../modules/users/Users.routes.js'
import otpRoutes from '../../modules/otp/otp.routes.js'
import userProfileRoutes from "../../modules/profile/UserProfile.routes.js"
import imageUploadRoutes from "../../modules/cloudinary/Images.routes.js"
const router = Router()
/**
 * @ to login signup
 */
router.use('/user', UserRoutes)

/**
 * @ to otp validations
 */

router.use('/otp', otpRoutes)
// router.get('/api', (req, res) => res.send('Default route'))

router.use('/user-profile', userProfileRoutes)

router.use('/file', imageUploadRoutes)

export default router