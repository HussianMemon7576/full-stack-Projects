import type { Request, Response } from "express"
import asyncHandler from "../utils/asyncHandler.js"
import { passwordResetService, passwordService, profileService, resetPasswordService, userNameService } from "../services/user.services.js"
import { success } from "zod"

export const profileController = asyncHandler(async function (req:Request,res:Response) {
    const user = req.userId
   

    const userprofileService = await profileService(user.userId)

    return res.status(200).json({
success : true,
message : "fetched user profile",
        data : {
            username : userprofileService.username,
            email : userprofileService.email,
        
    }
    }) 
})

export const changeUserNameController = asyncHandler(async function(req:Request,res:Response){
    const {newUserName} = req.body

   const user = req.userId

   const changeUserNameService = await userNameService(user.userId,newUserName);

     res.status(200).json({
      success: true,
      message: "Username updated successfully",
      data: {
        username: changeUserNameService.username,
        usernameLastChangedAt: changeUserNameService.lastUserNameUpdate,
      },
    });
})



export const changePasswordController = asyncHandler(async function(req:Request,res:Response){
      const { oldPassword, newPassword } = req.body;
console.log(oldPassword,newPassword)
    const user = req.userId;

    const result = await passwordService(
      user.userId,
      oldPassword,
      newPassword
    );

     res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: {
        username: result.username,
        password: result.password,
        usernameLastPasswordUpdate: result.lastPasswordUpdate,
      },
    });
})



  



export const forgotPasswordController = asyncHandler(
  async function (req: Request, res: Response) {
    const { email } = req.body;

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Valid email is required",
      });
    }

    const message = await passwordResetService(email);

    return res.status(200).json({
      success: true,
      message,
    });
  }
);

export const resetPasswordController = asyncHandler(
  async function (req: Request, res: Response) {
    const { token, newPassword,confirmPassword } = req.body;

    if (typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Token  are required",
      });
    }

    const message = await resetPasswordService(
      token,
      confirmPassword
    );

    return res.status(200).json({
      success: true,
      message,
    });
  }
);  