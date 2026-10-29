import expres from "express"
import { validate } from "../middlewares/validation.middleware.js"
import { loginSchema, userSchema, verifyOtpSchema } from "../validations/user.validation.js"
import { login, logoutAllController, logoutController, register, verify_otp,newAccessTokenController } from "../controllers/auth.controller.js"
import { verifyRefreshTokenMiddleware } from "../middlewares/auth.middleware.js"
const router = expres.Router()

// Post methdods
router.post("/register",validate(userSchema),register)
router.post("/login",validate(loginSchema),login)
router.post("/verify-otp",validate(verifyOtpSchema),verify_otp)
router.post( "/logout",verifyRefreshTokenMiddleware,logoutController);
router.post( "/logout-all",verifyRefreshTokenMiddleware, logoutAllController);
router.post("/refresh",verifyRefreshTokenMiddleware,newAccessTokenController)
export default router