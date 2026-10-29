import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    userId : {
             type: mongoose.Schema.Types.ObjectId,
              ref: "Users",
              required: true,
    },
    email : {
        
        type : String,
        required:true,
        unique:true,
        
        match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  "Please enter a valid email address",],
        lowercase:true,
        trim:true,
        
    },
    otpHashed: {
        type : String,
        required : true,
        unique : true,

    },
    attempts: {
        type : Number,
        default : 0
    },
    expiresAt : {
        type : Date,
        required:true

    }

},{timestamps:true})

const otpModel = mongoose.model("otps",otpSchema)
export default otpModel