
import { Config } from "../config/config.js";
import mongoose from "mongoose";
import dns from "dns"

dns.setServers(["8.8.8.8", "1.1.1.1"]);
export async function connectDB() {
    try {
    const DB_INSTANCE = await mongoose.connect(Config.MONGO_URI)
        console.log("MONGO_DB connected successfully",DB_INSTANCE.connection.host)
    } catch (error) {
        console.log("MONGO_DB connection FAILED" , error);
        
    }

}