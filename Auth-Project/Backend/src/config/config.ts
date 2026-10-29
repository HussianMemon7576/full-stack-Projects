import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is invalid or not found");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is invalid or not found");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET is invalid or not found");
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error("GOOGLE_REFRESH_TOKEN is invalid or not found");
}

if (!process.env.GOOGLE_ACCESS_TOKEN) {
  throw new Error("GOOGLE_ACCESS_TOKEN is invalid or not found");
}

if (!process.env.GOOGLE_USER) {
  throw new Error("GOOGLE_USER is invalid or not found");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is invalid or not found");
}
if(!process.env.FRONTEND_URL){
  throw new Error("FRONTENT_URL not found")
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  GOOGLE_ACCESS_TOKEN: process.env.GOOGLE_ACCESS_TOKEN,
  GOOGLE_USER : process.env.GOOGLE_USER,
  JWT_SECRET:process.env.JWT_SECRET,
  FRONTEND_URL : process.env.FRONTEND_URL
};

export default config;