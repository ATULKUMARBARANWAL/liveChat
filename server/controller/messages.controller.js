import messageRepository from "../repository/messages.repository.js";
import customError from "../middleware/applicationError.middleware.js";

const messagesController={
    async reciveMessages(req,res, next) {
        try{
            
        const userId=req.params.userId;
        const userId2=req.params.userId2;
        if(!userId || !userId2) {
            throw new customError("Both user ids are required", 400);
        }
        const messages = await messageRepository.reciveMessages(userId, userId2);
        res.status(200).json(messages);
    } catch(error) {
        throw new customError("Error retrieving messages", 500);
        next(error);
        }    }
}

export default messagesController;