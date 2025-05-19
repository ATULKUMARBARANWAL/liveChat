import userController from "../controller/user.controller.js";
import express from "express";
import upload from "../middleware/upload.middleware.js";
const Router=express.Router();
Router.post("/",upload.single("Url"),userController.registerUser);
Router.post("/signin",userController.signInUser);

export default Router;