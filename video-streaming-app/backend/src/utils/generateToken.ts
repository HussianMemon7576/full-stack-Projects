import type mongoose from "mongoose";
import { Config } from "../config/config.js";
import jwt from "jsonwebtoken"

function generateAccessToken(id:mongoose.Schema.Types.ObjectId,sessionid :mongoose.Schema.Types.ObjectId){
    return jwt.sign({id : id, sessionid },Config.ACCESS_Token_Secret,{expiresIn: Config.ACCESS_TOKEN_expiry})
}

function generateRefreshToken(id:mongoose.Schema.Types.ObjectId){
    return jwt.sign({id : id},Config.REFRESH_Token_Secret,{expiresIn : Config.REFRESH_TOKEN_expiry})
}

export {generateAccessToken,generateRefreshToken}