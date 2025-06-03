import messageSchema from "../schema/messageSchema.js";
import mongoose from "mongoose";
import customError from "../middleware/applicationError.middleware.js";

const messageModel=mongoose.model("Message",messageSchema);
const messageRepository={
    async reciveMessages(userId, userId2) {
        try{

            if(!userId)
            {
                throw new customError("User id is required",400)
            }
const messages = await messageModel.find({
  $or: [
    { sender: userId, receiver: userId2 },
    { sender: userId2, receiver: userId }
  ]
})
.sort({ createdAt: 1 })
.populate('sender', 'name email')
.populate('receiver', 'name email')
.exec();

console.log("Messages retrieved:", messages.length, "messages");
            return messages;
        }catch(error){
            throw new customError("Error retrieving messages",500)
        }
    }
}
export default messageRepository;