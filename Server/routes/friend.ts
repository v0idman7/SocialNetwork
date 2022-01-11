import { Router } from 'express';
import FriendController from '../controllers/friend.controller';

const friendRouter = Router();
const friendController = new FriendController();

friendRouter.get('/', (req, res, next) => friendController.get(req, res, next));
friendRouter.post('/', (req, res, next) =>
  friendController.add(req, res, next)
);
friendRouter.delete('/', (req, res, next) =>
  friendController.delete(req, res, next)
);

export default friendRouter;
