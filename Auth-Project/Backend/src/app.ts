import express from "express"
import errorMiddleware from "./middlewares/error.middleware.js"
import authRouter from "../src/routes/auth.routes.js"
import userRouter from "../src/routes/user.routes.js"
import cookieParser from 'cookie-parser';
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : 'http://localhost:5173',
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use(errorMiddleware)

export default app