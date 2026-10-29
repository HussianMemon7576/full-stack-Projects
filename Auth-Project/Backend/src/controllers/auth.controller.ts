import type { Request,Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { loginService, logoutAllService, logoutService, newTokenService, registerService } from "../services/auth.services.js";
import { verifyOtpService } from "../services/auth.services.js";
import { sendCookie,clearCookie } from "../utils/sendCookie.js";
import CustomError from "../utils/customError.js";
/**  * 
 *- user register controller
 *- Post /api/auth/register
 */

export const register = asyncHandler(async function(req:Request,res:Response){

    const {username,email,password} = req.body

    const registerUser = await registerService(username,email,password)
    console.log(registerUser)
    return res.status(201).json({
        message : "User registered successfully",
        success:true,
      data: {
id: registerUser._id,
username: registerUser.username,
email: registerUser.email,
isVerified: registerUser.isVerified,
},
    })
})

/** 
 *- user login controller
 *- Post /api/auth/login
 */

 export const login = asyncHandler(async function (req:Request,res:Response) {
        const {email,password} = req.body
        const loginUser = await loginService(email,password,req.ip ?? null,req.headers["user-agent"] ?? null)
  if (loginUser.requiresVerification) {
      return res.status(200).json({
     
        success: true,
        message: loginUser.message,
        requiresVerification: true,
           email : loginUser.email
      });
    }
    
  sendCookie(res,loginUser.RefreshToken)
  return res.status(200).json({
       message: loginUser.message,
      success: true,
   requiresVerification : false,
      accessToken: loginUser.AccessToken,
      data : {
        id : loginUser.user?._id,
        username : loginUser.user?.username,
        email : loginUser.user?.email,
        isVerified : loginUser.user?.isVerified
      }
    });
 })


 /** 
 *-  Logout user 
 *- Post /api/auth/logout
 */

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = res.locals.refreshToken as string;

    const result = await logoutService(token);

    clearCookie(res)

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  }
);


 /** 
 *-  Logout from all users devices
 *- Post /api/auth/logout-all
 */



export const logoutAllController = asyncHandler(
  async (req: Request, res: Response) => {
    const decoded = res.locals.decodedRefreshToken;

    if (
      !decoded ||
      typeof decoded === "string" ||
      !("userId" in decoded) ||
      typeof decoded.userId !== "string"
    ) {
      throw new CustomError("Invalid token payload", 401);
    }

    const result = await logoutAllService(decoded.userId);

   clearCookie(res)

    return res.status(200).json({
      success: true,
      message: result.message,
      revokedSessions: result.revokedSessions,
    });
  }
);

 /** 
 *- Create new Access Token and Refresh Token
 *- Post /api/auth/refresh
 */

export const newAccessTokenController = asyncHandler(async function (req:Request,res:Response){
    const token = res.locals.refreshToken as string;

    const result = await newTokenService(token)

      sendCookie(res,result.RefreshToken)

      return res.status(200).json({
       
        success:  true,
 message: "New Token generated",
  accessToken : result.AccessToken,

      })
}) 

 /** 
 *- verifiy user Otp
 *- Post /api/auth/verify-otp
 */

 export const verify_otp = asyncHandler(async function (req:Request,res:Response) {

    const {email,otp} = req.body
    const verify_otp = await verifyOtpService(email,otp,req.ip??null,req.headers["user-agent"] ?? null)

        
    sendCookie(res,verify_otp.RefreshToken)
      return res.status(200).json({
        message: "Otp verified Successfully",
          success: true,
            accessToken: verify_otp.AccessToken,
        data : {
   id : verify_otp.user?._id,
  username : verify_otp.user?.username,
        email : verify_otp.user?.email,
           isVerified : verify_otp.user?.isVerified
         
        }
    })
    });
  



  