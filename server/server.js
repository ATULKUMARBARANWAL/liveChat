import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './route/user.route.js'
import connectDB from './config/mongodb.js'
dotenv.config()
connectDB()
const server=express()
server.use(cors())
server.use(express.json()); // 
  server.use('/api/user',userRoutes)
server.listen(3000,()=>{
    console.log("Server is running on port 3000")
})