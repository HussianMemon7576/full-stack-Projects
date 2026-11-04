import { connectDB } from "./db/db.js";
import app from "./app.js";
const Port  = process.env.PORT || 8000

connectDB()
.then(() => {app.listen(Port, () => {console.log(`Server is running on Port ${Port}`)})})
.catch((err) => {console.log("MONGO DB connection FAILED", err)})