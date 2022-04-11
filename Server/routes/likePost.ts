import { Router } from 'express';

import LikePostController from '../controllers/likePost.controller';
import authentication from '../middlewares/auth.middleware';

const likePostRouter = Router();
const likePostController = new LikePostController();

likePostRouter.post('/', authentication, (req, res, next) =>
  likePostController.add(req, res, next)
);

export default likePostRouter;
