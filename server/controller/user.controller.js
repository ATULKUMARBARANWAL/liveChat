import userRepository from "../repository/user.repository.js";
import UserRepository from "../repository/user.repository.js";
import jwt from "jsonwebtoken";
const jwtSecret=process.env.JWT_SECRET || 'default_jsonwebtoken_secret';
const UserController = {
  async registerUser(req, res, next) {
    try {
      const userData = req.body;
      const file = req.file;

  
      if (!userData || !file) {
        return res.status(400).json({ message: "User data or file missing" });
      }
  
      // Add uploaded file name/path to userData if needed
      userData.pic = file.filename; // or file.path
  
      const user = await UserRepository.registerUser(userData);
      if (!user) {
        return res.status(400).json({ message: "User not registered" });
      }
  
      res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  async signInUser(req,res,next){
try{
const userData=req.body;

if(!userData.email || !userData.password)
{
  return res.status(400).json({message:"Please fill all the fields"})
}
const user=await UserRepository.signInUser(userData);
console.log("this is user",user)
if(!user)
{
  res.status(400).json({message:"Invalid credentials"})
}
else {
  const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });

  res.status(200).json({
    message: "User Logged in successfully",
    data: user,
    token: token
  });
}

}
catch(err){
    console.log(err.message);
    next(err)
  }
},
async getFilteredUser(req, res, next) {
  try {
 
    const search = req.params.Query;
    if (!search || typeof search !== 'string') {
      return res.status(200).json({ message: "Users found", data: {} });
    }

    const users = await UserRepository.getFilteredUsers({ search });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    } else {

      return res.status(200).json({ message: "Users found", data: users });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
},
async getUserDetails(req,res,next){
try{

const userId=req.params.userId;
if(!userId)
{
  return res.json(404).json({message:"userId is not Present"})
}
const userDetails = await userRepository.singleUserDetails({userId})
if(!userDetails){
  return res.json(404).json({message:"user Details Not Found"})
}
return res.status(200).json({message:"User Details is present",data:userDetails})
}
catch(err)
{
  console.log(err.message);
  next()
}
}
};

export default UserController;
