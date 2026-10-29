import otpModel from "../models/otp.js";

export async function createUserotp(
  userId: string,
  email: string,
  otpHashed: string,
  expiresAt: Date
) {
  return await otpModel.findOneAndUpdate(
    { email },
    {
      $set: {
        userId,
        otpHashed,
        expiresAt,
      },
    },
    {
      upsert: true,
      returnDocument: "after",
    }
  );
}
export async function findUserOtp(otp:string){
        return await otpModel.findOne({otpHashed:otp})
}

export async function deleteManyOtp(email: string) {
  return await otpModel.deleteMany({ email });
}