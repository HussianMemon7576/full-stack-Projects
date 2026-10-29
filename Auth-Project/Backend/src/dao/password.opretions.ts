import { PasswordResetToken } from "../models/passwordResetToken.model.js"

export const deleteManyUserPassword = async(id:string) => {
    return await PasswordResetToken.deleteMany({user:id})
}

export const createResetPassword = async(id:string,Hashtoken:string,expiresAt:Date) => {
    return await PasswordResetToken.create({user:id,tokenHash:Hashtoken,expiresAt:expiresAt})
}

 
export const resetRecord = async(tokenHash:string) => {

   return  await PasswordResetToken.findOneAndUpdate(
    {
      tokenHash:tokenHash,
      expiresAt: { $gt: new Date() },
      usedAt: null,
    },
    {
      $set: { usedAt: new Date() },
    },
    {
      returnDocument: "after",
    }
  );
  } 
