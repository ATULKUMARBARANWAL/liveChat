import mongoose from "mongoose";
import Group from "../schema/groupSchema.js";
import customError from "../middleware/applicationError.middleware.js";
const groupModel = mongoose.model("Group", Group);
const groupRepository = {
  async createGroup(groupData) {
    try {
      if (
        !groupData ||
        !groupData.name ||
        !Array.isArray(groupData.members) ||
        groupData.members.length === 0 ||
        !groupData.admin
      ) {
        throw new customError("Group data is incomplete. Please provide name, members (array), and admin.");
      }

    const newGroup = new groupModel(groupData);
    const savedGroup = await newGroup.save();
    return savedGroup;
  } catch (err) {
    throw new customError("Error creating group: " + err.message);
  }
},

async findGroups(userId)
{
if(!userId)
{
  throw new customError("User Id is not present",404)
}
const findGroup= await groupModel.find({
  members:userId
})

if(!findGroup)
{
  console.log("inner")
throw customError("there is not any group present for perticuler user",500)
}
console.log("outer")
return findGroup;
}
}
export default groupRepository;
