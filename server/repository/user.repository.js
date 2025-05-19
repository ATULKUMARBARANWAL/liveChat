import userSchema from "../schema/userSchema.js";
import mongoose from "mongoose";
import customError from "../middleware/applicationError.middleware.js";
import bcrypt from "bcryptjs";

const userModel=mongoose.model("User",userSchema)
const userRepository={
    async registerUser(userData){
        try{
           console.log("userData",userData)
            if(!userData.name || !userData.email || !userData.password){
                throw new customError("Please fill all the fields",400)
            }
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(userData.password, salt);

            console.log("hashedPassword",hashedPassword)
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
        const checkUser=await userModel.findOne({email:userData.email,password:userData.password})
        console.log("checkUser",checkUser)
        if(!checkUser){
            throw new customError("Invalid credentials",400)
        }
return checkUser;
    }
    catch(err)
    {
        console.log(err.message);
        throw new customError(err.message,500)
    }
}
}
export default userRepository