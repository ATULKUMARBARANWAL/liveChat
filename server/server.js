import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './route/user.route.js';
import connectDB from './config/mongodb.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const server = express();

server.use(express.json())
const _dirname=path.dirname("")

// const buildPath = path.join(_dirname, '../client/build');
// console.log(buildPath);
// server.use(express.static(buildPath));
dotenv.config();
connectDB();

server.use(cors());
server.use(express.json());

server.use('/api/user', userRoutes);

// Handle all other requests by serving the React app's index.html

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});