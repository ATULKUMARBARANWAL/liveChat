import userController from "../controller/user.controller.js";
import express from "express";
import messagesController from "../controller/messages.controller.js";
import upload from "../middleware/upload.middleware.js";
const Router=express.Router();
Router.post("/",upload.single("pic"),userController.registerUser);
Router.post("/signin",userController.signInUser);
Router.get("/filtered/:Query",userController.getFilteredUser);
Router.get("/userDetails/:userId",userController.getUserDetails);
Router.get("/downloadImage/:pic",userController.downloadImage);

export default Router;