import mongoose from "mongoose";
import config from "../config/config.js";
import dns from "dns"
dns.setServers(["8.8.8.8"])




const connectDB = async () => {
  await mongoose.connect(config.MONGO_URI!);

  console.log("MongoDB connected successfully");
};

export default connectDB;

