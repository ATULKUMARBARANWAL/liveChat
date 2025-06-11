// file: schema/messageSchema.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  isGroupMessage:{type:Boolean,default:false},
  groupId:{type:String},
  timestamp: { type: Date, default: Date.now }
});

export default messageSchema;
