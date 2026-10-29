import { findUserAndUpdate, findUserByEmail, findUserbyId } from "../dao/auth.opretions.js";
import { checkCooldown } from "../utils/cooldown.js";
import CustomError from "../utils/customError.js";
import bcrypt from "bcrypt"
import { generateResetToken, hashResetToken } from "../utils/resetTokens.js";
import { createResetPassword, deleteManyUserPassword, resetRecord } from "../dao/password.opretions.js";
import { userSchema } from "../validations/user.validation.js";
import { sendresetPasswordToEmail } from "../emailService/email.js";
import config from "../config/config.js";
export async function profileService(userid : string){
    const user = await findUserbyId(userid)
if(!user){
    throw new CustomError("User not found",401)
}
return user
}

 
export async function userNameService(
  userid: string,
  newUserName: string
) {

  const currentTime = new Date();
const cutoff = new Date(currentTime.getTime() - 12 * 60 * 60 * 1000);

  const user = await findUserbyId(userid);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  if (user.username === newUserName) {
    throw new CustomError(
      "New username must be different from current username",
      400
    );
  }

  checkCooldown(user.lastUserNameUpdate);

 
const updatedUser = await findUserAndUpdate(
  userid,
  "username",
  newUserName,
  cutoff,
  currentTime
);

  if (!updatedUser) {
    throw new CustomError("Unable to update username", 400);
  }

  return updatedUser;
}




export async function passwordService(
  userid: string,
  oldPassword: string,
  newPassword : string,
) {
  
  console.log(oldPassword,newPassword)
  const currentTime = new Date();
const cutoff = new Date(currentTime.getTime() - 12 * 60 * 60 * 1000)
  const user = await findUserbyId(userid);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

   const isOldPasswordCorrect = await bcrypt.compare(
    oldPassword,
    user.password
  );

  if (!isOldPasswordCorrect) {
    throw new CustomError("Old password is incorrect", 400);
  }

 const isSamePassword = await bcrypt.compare(
    newPassword,
    user.password
  );

  if (isSamePassword) {
    throw new CustomError(
      "New password must be different from current password",
      400
    );
  }
 
  checkCooldown(user.lastPasswordUpdate);

const hashedPassword = await bcrypt.hash(newPassword, 10);


const updatedUser = await findUserAndUpdate(
  userid,
  "password",
  hashedPassword,
  cutoff,
  currentTime
);
  if (!updatedUser) {
    throw new CustomError("Unable to update username", 400);
  }

  return updatedUser;

}

const RESET_COOLDOWN = 60 * 1000;

const lastResetRequests = new Map<string, number>();

export async function passwordResetService(email: string) {
  const genericMessage =
    "If an account exists for this email, a reset link will be sent.";

  const normalizedEmail = email.trim().toLowerCase();
  const now = Date.now();

  
  const lastRequest = lastResetRequests.get(normalizedEmail);

  if (
    lastRequest !== undefined &&
    now - lastRequest < RESET_COOLDOWN
  ) {
    return genericMessage;
  }

  lastResetRequests.set(normalizedEmail, now);

  
  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    return genericMessage;
  }

  const { token, tokenHash } = generateResetToken();

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await deleteManyUserPassword(user._id.toString());


  await createResetPassword(
    user._id.toString(),
    tokenHash,
    expiresAt
  );

 
  const resetUrl =
    `${config.FRONTEND_URL}/reset-password?token=${token}`;

  await sendresetPasswordToEmail(user.email, resetUrl);

  // 8. Generic response return karo
  return genericMessage;
}



export const resetPasswordService = async (
  token: string,
  confirmPassword: string
) => {
  if (!token ) {
    throw new CustomError(
      "Token and new password are required",
      400
    );
  }


  const tokenHash = hashResetToken(token);

 const record = await resetRecord(tokenHash)
  if (!record) {
    throw new CustomError(
      "Reset link is invalid or expired",
      400
    );
  }

  const user=  await findUserbyId(record.user.toString())

  if (!user) {
    throw new CustomError("User not found", 404);
  }



  user.password = confirmPassword;
    await user.save();

  // Is user ke baqi reset links bhi invalidate karo
  await deleteManyUserPassword(user._id.toString());

  return "Password reset successfully";
};