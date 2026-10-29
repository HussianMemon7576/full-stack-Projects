import { findUserByEmail,create ,findUserbyIdandupdate, findUserbyId} from "../dao/auth.opretions.js";
import { createUserotp,findUserOtp,deleteManyOtp } from "../dao/otp.opretions.js";
import { sendotpEmail } from "../emailService/email.js";

import CustomError from "../utils/customError.js";
import { convertvaluetoCrypto } from "../utils/hashed.js";
import { createOtp, createOtpHtml } from "../utils/otpHelper.js";
import { comaprePasswrord } from "../utils/compare.js";


import { findSession,updateManySessions,findOneSession } from "../dao/session.js";
import { createSession } from "../utils/createUserSession.js";
import { createAccessToken, createRefreshToken } from "../utils/Tokens.js";


export async function registerService(username:string,email:string,password:string) {
        const findUser = await findUserByEmail(email)
        if(findUser){
            throw new CustomError("Email already exists", 409);
        }
        const createUser = await create(username,email,password)

        const otp = createOtp();

const otpHash = convertvaluetoCrypto(otp);

const otpHtml = createOtpHtml(otp);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
await createUserotp(createUser._id.toString(),email,otpHash,expiresAt)

await sendotpEmail(email, otpHtml);

    return createUser

}

export async function loginService(email:string,password:string,ip:string|null,userAgent:string|null){
    const findUser = await  findUserByEmail(email)
    if(!findUser){
           throw new CustomError("Not found", 401);
    }
    console.log("User found:", Boolean(findUser));
console.log("Password field exists:", Boolean(findUser?.password));
    const isUserpasswordvalid = await comaprePasswrord(password,findUser.password)
console.log("Password valid:", isUserpasswordvalid);

if(!isUserpasswordvalid){
      throw new CustomError("Password is invalid", 401);
}

if(!findUser.isVerified){
   const otp = createOtp();

const otpHash = convertvaluetoCrypto(otp);

const otpHtml = createOtpHtml(otp);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
await createUserotp(findUser._id.toString(),findUser.email,otpHash,expiresAt)

await sendotpEmail(findUser.email, otpHtml);
    return {
      email : findUser.email,
      message: "OTP sent. Please verify your email.",
      requiresVerification: true,
    };
}
const userSession = await createSession(findUser._id.toString(),ip,userAgent)

 return {
     requiresVerification: false,
       message: "Login successful",
    user : findUser,
   AccessToken : userSession.AccessToken,
   RefreshToken: userSession.RefreshToken,
   
 }
}




export async function verifyOtpService(email:string,otp:string ,ip:string|null,userAgent:string|null){
    const otpHash = convertvaluetoCrypto(otp)
    const findUserbyOtp = await findUserOtp(otpHash)
    if(!findUserbyOtp){
          throw new CustomError("Otp is invalid", 401);
    }
    const findUser = await findUserbyIdandupdate(findUserbyOtp.userId.toString())
  
  
      if(!findUser){
          throw new CustomError("User is not found", 401);
    }

 
const userSession = await createSession(findUser._id.toString(),ip,userAgent)

    const deleteOtp = await deleteManyOtp(email)


return {
 RefreshToken: userSession.RefreshToken,
  AccessToken:userSession.AccessToken,
    user : findUser
}
}


export async function logoutService(token: string) {
  const hashedToken = convertvaluetoCrypto(token);

  const session = await findSession(hashedToken)

  if (!session) {
    throw new CustomError(
      "Session not found or already revoked",
      401
    );
  }



  return {
    message: "Logged out successfully",
  };
}


export async function logoutAllService(userId: string) {
  const result =  await updateManySessions(userId)
if (result.matchedCount === 0) {
    throw new CustomError(
      "No active sessions found",
      404
    );
  }

  return {
    message: "Logged out from all devices successfully",
    revokedSessions: result.modifiedCount,
  };
}

export async function newTokenService(token:string){
 const refreshTokenHash = convertvaluetoCrypto(token)
 const session = await  findOneSession(refreshTokenHash)
 if(!session){
  throw new CustomError("Session not found",401)
 }
 const User = await findUserbyId(session.user.toString())
 if(!User){
  throw new CustomError("User not found",401)
 }
 const RefreshToken = createRefreshToken(session._id.toString())
     const RefreshTokenhashed = convertvaluetoCrypto(RefreshToken)
    
     
     const AccessToken = createAccessToken(User._id.toString(),session._id.toString())
    session.refreshTokenHash = RefreshTokenhashed
    await session.save()

    return {
      RefreshToken,
      User,
      AccessToken,
    
    }
}

