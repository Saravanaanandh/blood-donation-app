import express from 'express'
import { signupController,loginController, logoutController, updateProfileController,getUserProfile } from '../controllers/authController.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup',signupController)
router.post('/login',loginController)

router.get('/check-auth',verifyJWT)
router.get('/',verifyJWT,getUserProfile)
router.put('/update-profile',verifyJWT,updateProfileController)
router.get('/logout',verifyJWT,logoutController)

export default router