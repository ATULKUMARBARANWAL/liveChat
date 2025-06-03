import expresss from 'express';
import messagesController from '../controller/messages.controller.js';
const Router=expresss.Router();

Router.get('/receiveMessages/:userId/:userId2', messagesController.reciveMessages);
export default Router; 