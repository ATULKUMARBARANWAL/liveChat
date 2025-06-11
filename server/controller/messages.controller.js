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
        }    },
        async groupMessage(req,res,next)
        {
            try{
        const groupId=req.params.groupId;
     
        if(!groupId)
        {
            throw new customError(400,'groupId is not present')
        }
        const allGroupMessage=await messageRepository.groupMessage(groupId)
        if(!allGroupMessage)
        {
            throw new customError(404,'there is not any message present for perticuler groupId')
        }
        res.status(201).json({message:"all message of a group",
            data:allGroupMessage

       } )
            }
            catch(err)
            {
                throw new customError(500,"Somthing went Wrong")
            }
        }
}

export default messagesController;