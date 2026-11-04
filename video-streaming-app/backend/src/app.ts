import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN || "http://localhost:3000",
        allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,

    
}));
app.use(express.json({strict:true}));
app.use(express.static("public"));
app.use(cookieParser())

export default app