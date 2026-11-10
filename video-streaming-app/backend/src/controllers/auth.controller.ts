

// Register Api => post

import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

const register = asyncHandler(async function registerUser(req:Request,res:Response) {

})

export {register}