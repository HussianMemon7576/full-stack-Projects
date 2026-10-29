import SessionModel from "../models/session.js";

export async function createSessionInDB(userid : string,refreshToken:string,ip:string|null,userAgent:string|null) {
    return await SessionModel.create({user:userid,refreshTokenHash:refreshToken,ip:ip,userAgent:userAgent}) 
}
export async function findSession(hashedToken:string){
    return await SessionModel.findOneAndUpdate({
      refreshTokenHash: hashedToken,
      revoked: false,
    },
    {
      $set: { revoked: true },
    },
    {
      returnDocument: "after",
    }
  );
}
export async function findOneSession(hashedToken:string){
    return await SessionModel.findOne({refreshTokenHash:hashedToken},{revoked:false})
}

export async function updateManySessions(userId: string) {
  return  await SessionModel.updateMany(
    {
      user: userId,
      revoked: false,
    },
    {
      $set: {
        revoked: true,
      },
    }
  );

  
}

