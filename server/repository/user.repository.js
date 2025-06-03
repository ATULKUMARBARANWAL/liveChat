import userSchema from "../schema/userSchema.js";
import mongoose from "mongoose";
import customError from "../middleware/applicationError.middleware.js";
import bcrypt from "bcryptjs";

const userModel=mongoose.model("User",userSchema)
const userRepository={
    async registerUser(userData){
        try{
          
            if(!userData.name || !userData.email || !userData.password){
                throw new customError("Please fill all the fields",400)
            }
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(userData.password, salt);

           
            userData.password=hashedPassword;
        const checkUser=await userModel.findOne({email:userData.email})
        if(checkUser){
        throw new customError("user Already exixts",400)
        }
        const user=new userModel(userData)
        user.save();
return user;
    }

    catch(err){
        console.log(err.message);
        throw new customError(err.message,500)
    }
    },
async signInUser(userData){
    try{
   
      if(!userData.email || !userData.password){
            throw new customError("Please fill all the fields",400)
        }
        const salt =await bcrypt.genSalt(10);
       
    
        const checkUser=await userModel.findOne({email:userData.email})
   
        if(!checkUser){
            throw new customError("Invalid credentials",400)
        }
        const isMatch=await bcrypt.compare(userData.password,checkUser.password)
        if(!isMatch){
            throw new customError("Invalid credentials",400)
        }
return checkUser;
    }
    catch(err)
    {
        console.log(err.message);
        throw new customError(err.message,500)
    }
},
async getFilteredUsers(query){
    try{
        const {search}=query;

        const filter={
            ...(search && {name:{$regex:search,$options:"i"}})
        }
      const filterdUsers=await userModel.find(filter)

        if(!filterdUsers){
            throw new customError("No users found",400)
        }
   
        return filterdUsers;
    }
    catch(err){
        throw new customError(err.message,500)
    }
},
async singleUserDetails({userId})
{
try{

if(!userId)
{
    throw new customError("userId is not Present",400)
}
const userDetails =await userModel.findOne({_id:userId})
if(!userDetails)
{
    throw new customError("user not be present in Database",400)
}
return userDetails;
}
catch(err)
{
    throw new customError(err.message,500)
}
}
}
export default userRepository