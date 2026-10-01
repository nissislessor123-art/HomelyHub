
import mongoose from "mongoose"
const connectDB =async()=>{
try{

    await mongoose.connect(process.env.MONGO_URI);
console.log('mongogodb connected')
} catch(error){
    console.error("Mangodb connection failed", error);
    process.exit(1);
}
}
export default connectDB;