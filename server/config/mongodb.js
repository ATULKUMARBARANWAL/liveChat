import mongoose from "mongoose";
const connectDB=async()=>{
    try{
  const conn=await  mongoose.connect(process.env.DB_URL)
console.log("MongoDB Connected");
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
}catch(err){
    console.log(err.message);
}

}
export default connectDB;