import mongoose from "mongoose";

const groupSchema=new mongoose.Schema({
    name:{type:String,required:true},
    members:[{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}],
    description:{type:String,default:"This is a group chat"},
    admin:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    groupPic:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdec44gppwt2u78xXgYzViyxNhFeCDOd3B8A&s"} // Default group picture URL
})

export default groupSchema;