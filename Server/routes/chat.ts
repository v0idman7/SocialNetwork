import { Router } from 'express';
import ChatController from '../controllers/chat.controller';
import authentication from '../middlewares/auth.middleware';

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.get('/', authentication, (req, res, next) =>
  chatController.get(req, res, next)
);
chatRouter.post('/', authentication, (req, res, next) =>
  chatController.add(req, res, next)
);
chatRouter.delete('/', authentication, (req, res, next) =>
  chatController.delete(req, res, next)
);

export default chatRouter;
