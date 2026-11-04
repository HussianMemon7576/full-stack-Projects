import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        refreshTokenHash : {
            type : String,
            required: true,
            unique : true
        },

        ip : {
            type : String,
            required: true,
            
        },

        useragent : {
            type : String,
            required: true,
            
        },

        revoked : {
            type : Boolean,
            default : false,
        },

        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },

    },
    {timestamps : true}
)

export const Session = mongoose.model("Session",sessionSchema)