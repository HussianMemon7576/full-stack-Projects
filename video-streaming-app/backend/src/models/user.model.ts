import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required: true,
            unique : true,
            trim : true
        } ,
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase: true,
            trim: true,
            index: true
        },
        password : {
            type : String,
            required: true,
            min: [8 , "username must be 8 chracters long"],
            max: [20 , "username must be 8 chracters long"]
        },
          fullName : {
            type : String,
            required: true,
            trim : true
        } ,

        avatar : {
            type : String,
            required : true
        },
        coverImage : {
            type : String,
            
        }
    },
    {timestamps:true}

)

userSchema.pre("save", async function(next){
    if(!this.isModified) 
    this.password = await bcrypt.hash(this.password,10)
  
})
userSchema.methods.isPasswordCorrect = function (password:string) {
    return  bcrypt.compare(password,this.password)
} 
export const User = mongoose.model("User",userSchema)