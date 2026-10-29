import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required:true,
      minlength: [3, "username must be at least 8 characters long"],
  maxlength: [20, "username cannot exceed 72 characters"],
  trim:true
    },

    email: {
        
        type : String,
        required:true,
        unique:true,
        
        match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  "Please enter a valid email address",],
        lowercase:true,
        trim:true,
    },
    password: {
        type : String,
        required : true,
      
      minlength: [8, "Password must be at least 8 characters long"],
  maxlength: [72, "Password cannot exceed 72 characters"],
    },
    isVerified:{
        type : Boolean,
        default: false
    },
    lastUserNameUpdate : {
        type : Date,
        default : null
    },
    lastPasswordUpdate: {
        type : Date,
        default: null
    },
},{timestamps:true})


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

const Usermodel = mongoose.model("Users",userSchema)


export default Usermodel