import UserRepository from "../repository/user.repository.js";

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
  }
  
};

export default UserController;
