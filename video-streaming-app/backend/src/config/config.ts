import dotenv from "dotenv"

dotenv.config()


if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is missing")
}
export const Config = {
    MONGO_URI : process.env.MONGO_URI
}