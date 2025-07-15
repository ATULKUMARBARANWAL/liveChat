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
import groupRoute from './route/groupData.routes.js'
import customError from './middleware/applicationError.middleware.js';
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


  // Register user with socket
  socket.on('register', (userId) => {
    connectedUsers.set(userId, socket.id);

  });

  // Join a room
  socket.on('joinRoom', (roomId) => {
  if (roomId.includes("_")) {
    // 1-1 private room
    const sortedRoomId = roomId.split('_').sort().join('_');
    socket.join(sortedRoomId);

  } else {
    // group room
    socket.join(roomId);
  
  }
});
socket.on('joinVideoCall', ({ sender, receiver, SenderName, ReceiverName }) => {
 
  const receiverSocketId = connectedUsers.get(receiver);
  

  if (!receiverSocketId) {

    return;
  }

  io.to(receiverSocketId).emit('videoCallRequest', {
    sender,
    receiver,
    SenderName,
    ReceiverName,
    socketId: socket.id, 
  });

});
socket.on('rejectVideoCall', ({ sender, receiver, socketId, SenderName, ReceiverName }) => {

  const senderSocketId = connectedUsers.get(sender);
  if (!senderSocketId) {
   
    return;
  }
  io.to(senderSocketId).emit('videoCallRejected', {
    sender,
    receiver,
    SenderName,
    ReceiverName,
    socketId: socket.id, 
  });
});
socket.on('videoCallAccepted', ({ sender, receiver, socketId, SenderName, ReceiverName }) => {
const receiverSocketId = connectedUsers.get(receiver);
  if (!receiverSocketId) {

    return;
  }
  io.to(receiverSocketId).emit('videoCallAcceptedd', {
    sender,
    receiver,
    SenderName,
    ReceiverName,
    socketId: socket.id, 
  });

})
// Inside io.on('connection', socket => { ... })

socket.on('videoOffer', ({ offer, sender, receiver }) => {
  const receiverSocketId = connectedUsers.get(receiver);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('videoOffer', { offer, sender });
  }
});

socket.on('videoAnswer', ({ answer, sender, receiver }) => {
  const receiverSocketId = connectedUsers.get(receiver);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('videoAnswer', { answer });
  }
});

socket.on('sendIceCandidate', ({ candidate, sender, receiver }) => {
  console.log('🧊 Sending ICE candidate:', candidate, sender, receiver);
  const receiverSocketId = connectedUsers.get(receiver);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('receiveIceCandidate', { candidate });
  }
});

  socket.on('sendMessages', async (message) => {


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
        break;
      }
    }
  });
  socket.on('groupMessage', (data) => {

  
try{
const newMessage=new messageModel({
    sender:data.sender,
      message: data.message,
      isGroupMessage:true,
      groupId:data.groupId,
      admin:data.admin

  })
if(!newMessage)
{
  throw new customError(500,"Not able to store group Message")
}
else{
  newMessage.save()
}
io.to(data.groupId).emit('receiveGroupMessage', data); 

}
catch(err)
{
  throw customError(500,"Error in iserting in Database")
}
 
});



});


app.use('/api/user', userRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets', 'userUpload')));
app.use('/api/messages', messsageRoutes);
app.use('/api/group',groupRoute);
httpServer.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});
