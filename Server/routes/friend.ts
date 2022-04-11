import { Router } from 'express';

import FriendController from '../controllers/friend.controller';
import authentication from '../middlewares/auth.middleware';

const friendRouter = Router();
const friendController = new FriendController();

friendRouter.get('/friends', authentication, (req, res, next) =>
  friendController.getFriends(req, res, next)
);
friendRouter.get('/check', authentication, (req, res, next) =>
  friendController.checkFriend(req, res, next)
);
friendRouter.get('/other', authentication, (req, res, next) =>
  friendController.getOther(req, res, next)
);
friendRouter.get('/all', authentication, (req, res, next) =>
  friendController.getAll(req, res, next)
);
friendRouter.get('/add', authentication, (req, res, next) =>
  friendController.add(req, res, next)
);
friendRouter.delete('/delete', authentication, (req, res, next) =>
  friendController.delete(req, res, next)
);

export default friendRouter;
