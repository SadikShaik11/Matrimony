import Router from 'express'
import UserRoutes from '../../modules/users/Users.routes.js'
import otpRoutes from '../../modules/otp/otp.routes.js'
const router = Router()
/**
 * @ to login signup
 */
router.use('/user', UserRoutes)

router.use('/otp', otpRoutes)
// router.get('/api', (req, res) => res.send('Default route'))


export default router