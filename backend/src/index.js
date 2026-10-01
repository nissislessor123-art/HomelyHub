import express from "express"; //setup server
import dotenv from "dotenv";
import cors  from "cors";
import cookieParser from  "cookie-parser";
import connectDB from "./utils/db.js";
import {router} from "./routes/userRoutes.js"
import { propertyRouter } from "./routes/propertyRouter.js";
import { tripRouter } from "./routes/tripRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
dotenv.config();//it loads them in this file
console.log("Mongo URI exists:",!!process.env.MONGO_URI);
connectDB();
const app = express();//call creating appliction
//experess.json understand the middleware
app.use(express.json({limit:"100mb"}))
//urlencoded
app.use(express.urlencoded({limit:"100mb",extended:true}))
// cookie oarser
app.use(cookieParser())
app.use(cors({
    orgin:process.env.ORIGIN_ACCESS_URL,
    credentials:true
}))
const PORT=process.env.PORT;

//one test route
app.get("/",(req,res)=>{
    res.send("homely hub server is running")
})
app.use("/api/v1/rent/user",router)
app.use("/api/v1/rent/listing",propertyRouter)
app.use("/api/v1/rent/user/booking",bookingRouter)
app.use("/api/v1/rent/trip",tripRouter)
//get to feacth the data from server
app.listen(PORT,()=>{ // Start the server and keep it running
    console.log(`app is running on port no: ${PORT}`);
})
