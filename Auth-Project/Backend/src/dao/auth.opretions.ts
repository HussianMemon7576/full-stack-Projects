import Usermodel from "../models/User.js";

export async function findUserByEmail(email:string) {
        return await Usermodel.findOne({email:email})
}
export async  function create(username:string,email:string,password:string){
    return await Usermodel.create({username,email,password})
}
export async function findUserbyIdandupdate(id:string){
    return await  Usermodel.findByIdAndUpdate({_id:id},  { $set: { isVerified: true } },{returnDocument: "after"})
}

export async function findUserbyId(id:string) {
          return await Usermodel.findOne({_id:id}).select("username email password lastUserNameUpdate lastPasswordUpdate")
}


type UpdateField = "username" | "password";

export async function findUserAndUpdate(
  id: string,
  field: UpdateField,
  newValue: string,
  cutoff: Date,
  currentTime: Date
) {
  const lastUpdateField = field === "username" ? "lastUserNameUpdate": "lastPasswordUpdate";

  return await Usermodel.findOneAndUpdate(
    {
      _id: id,
      [field]: { $ne: newValue },
      $or: [
        { [lastUpdateField]: null },
        { [lastUpdateField]: { $lte: cutoff } },
      ],
    },
    {
      $set: {
        [field]: newValue,
        [lastUpdateField]: currentTime,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  ).select(`${field} ${lastUpdateField}`);
}
