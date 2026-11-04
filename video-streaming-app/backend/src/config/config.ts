import dotenv from "dotenv"
import type { StringValue } from "ms";
dotenv.config()


if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is missing")
}

if(!process.env.ACCESS_Token_Secret){
    throw new Error("ACCESS_Token_Secret is missing")
}
if(!process.env.ACCESS_TOKEN_expiry){
    throw new Error("ACCESS_TOKEN_expiry is missing")
}

if(!process.env.REFRESH_Token_Secret){
    throw new Error("REFRESH_Token_Secret is missing")
}

if(!process.env.REFRESH_TOKEN_expiry){
    throw new Error("REFRESH_TOKEN_expiry is missing")
}


export const Config = {
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_Token_Secret : process.env.ACCESS_Token_Secret,
    ACCESS_TOKEN_expiry : process.env.ACCESS_Token_expiry as StringValue ,
    REFRESH_Token_Secret : process.env.REFRESH_Token_Secret ,
    REFRESH_TOKEN_expiry : process.env.REFRESH_Token_expiry as StringValue,


}