import express from "express"
import { verifyAccessToken } from "../middlewares/user.middleware.js"
import { profileController,changeUserNameController, changePasswordController, resetPasswordController, forgotPasswordController } from "../controllers/user.controller.js"
import { changePasswordSchema, resetPasswordSchema, verifyuserName } from "../validations/user.validation.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = express()

router.get("/profile",verifyAccessToken,profileController);


router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password",validate(resetPasswordSchema),resetPasswordController);


router.patch("/change-username",validate(verifyuserName),verifyAccessToken,changeUserNameController)
router.patch("/change-password",validate(changePasswordSchema),verifyAccessToken,changePasswordController)

export default router