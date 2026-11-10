import { Router } from "express";
import { registerSchema } from "../validation/auth.validation.js";
import {upload} from "../middlewares/file.middleware.js"
import { parseSchema } from "../middlewares/parseSchema.js";
import { register } from "../controllers/auth.controller.js";

const router = Router()

// Post Api

//  User Register
router.route("/register").post(parseSchema(registerSchema),register)

export default router

