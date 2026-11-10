import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js" 
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN || "http://localhost:3000",
        allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,

    
}));
app.use(express.json({strict:true}));
app.use(express.static("public"));
app.use(cookieParser())

app.use("/api/v1/auth",authRoutes)

export default app