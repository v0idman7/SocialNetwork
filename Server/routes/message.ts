import { Router } from 'express';
import MessageController from '../controllers/message.controller';
import authentication from '../middlewares/auth.middleware';

const messageRouter = Router();
const messageController = new MessageController();

messageRouter.get('/', authentication, (req, res, next) =>
  messageController.get(req, res, next)
);

export default messageRouter;
