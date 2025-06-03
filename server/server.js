// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './route/user.route.js';
import connectDB from './config/mongodb.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import messageSchema from './schema/messageSchema.js';
import messsageRoutes from './route/messages.route.js';

dotenv.config();
connectDB();

const messageModel = mongoose.model('Message', messageSchema);
const app = express();
const httpServer = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  // Register user with socket
  socket.on('register', (userId) => {
    connectedUsers.set(userId, socket.id);
    console.log(`✅ Registered user: ${userId} -> ${socket.id}`);
  });

  // Join a room
  socket.on('joinRoom', (roomId) => {
    console.log(`📦 Joining room: ${roomId}`);
    const sortedRoomId = roomId.split('_').sort().join('_');
    socket.join(sortedRoomId);
    console.log("👥 Joined room:", sortedRoomId);
  });

  // Handle incoming messages
  socket.on('sendMessages', async (message) => {
    console.log('📨 Message received:', message);

    const newMessage = new messageModel({
      sender: message.sender,
      receiver: message.receiver,
      message: message.text,
    });

    // Generate consistent room ID
    const roomId = [String(message.sender), String(message.receiver)].sort().join('_');

    try {
      await newMessage.save();
    

      // Send message to both users in the room
      io.to(roomId).emit('receiveMessages', message);

      // (Optional) Log current connected users
      console.log("🔗 Connected Users:", [...connectedUsers.entries()]);
    } catch (err) {
      console.error('❌ Error saving message:', err);
    }
  });

  // On disconnect, remove user from map
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);

    for (const [userId, sId] of connectedUsers.entries()) {
      if (sId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`🗑️ Removed user: ${userId}`);
        break;
      }
    }
  });
});

// Routes and static file serving
app.use('/api/user', userRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets', 'userUpload')));
app.use('/api/messages', messsageRoutes);
httpServer.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});
