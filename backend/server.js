import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import BusRoutes from "./routes/BusRoutes.js"
import helmet from "helmet";


dotenv.config();

const app = express()
app.use(cors({
    credentials:true,
    origin: [
        process.env.FRONTEND_URL,
        "http://localhost:5173",
    ]
    
}));
app.use(cookieParser());
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false
}))


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