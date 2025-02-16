import express from 'express'
import { signupController,loginController, logoutController, updateProfileController } from '../controllers/authController.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup',signupController)
router.post('/login',loginController)

router.put('/update-profile',verifyJWT,updateProfileController)
router.get('/logout',verifyJWT,logoutController)

export default router