import groupRepository from "../repository/groupData.repository.js";
import customError from "../middleware/applicationError.middleware.js";
const groupDataController={
    async createGroup(req,res,next){
try{

const groupData=req.body;
if(!groupData || !groupData.name || !Array.isArray(groupData.members) || groupData.length===0 || !groupData.admin)
{
    throw new customError("Group data is incomplete. Please provide name, members (array), and admin.");
}
const newGroup=await groupRepository.createGroup(groupData);
if(!newGroup){
    throw new customError("Group not created", 400);
}
res.status(201).json({
    message: "Group created successfully",
    data: newGroup
});
    }
    catch(err){
        console.log(err.message);
        next(err);
    }
},
async allGroups(req,res,next)
{
   
const userId=req.params.userId;

try{
if(!userId)
{
    throw new customError("user is not prsent",404)
}
const allGroups=await groupRepository.findGroups(userId);
if(!allGroups)
{
    throw new customError("group is not pesent in database",404)
}
res.status(201).json({
    message:"all groups",
    data:allGroups
}

)
}
catch(err){
next(err);
}
}
}
export default groupDataController;