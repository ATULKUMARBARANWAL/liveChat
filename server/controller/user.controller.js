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
      userData.Url = file.filename; // or file.path
  
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
}
};

export default UserController;
