import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import BusRoutes from "./routes/BusRoutes.js"


dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/bus", BusRoutes)

app.get("/",(req,res)=>{
    console.log("api is running")
    res.send("hello Akash Good to go........")

})

connectDB()

app.listen(5004,()=>{
    console.log("app is running at Port 5004")
})