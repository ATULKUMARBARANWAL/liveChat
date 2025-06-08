import express from 'express';
import groupDataController from '../controller/groupData.controller.js';

const Router=express.Router();

Router.post('/createGroup', groupDataController.createGroup);
Router.get('/allGroups/:userId',groupDataController.allGroups)
export default Router;