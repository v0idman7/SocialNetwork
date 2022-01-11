import { Router } from 'express';
import LikePostController from '../controllers/likePost.controller';

const likePostRouter = Router();
const likePostController = new LikePostController();

likePostRouter.get('/', (req, res, next) =>
  likePostController.get(req, res, next)
);
likePostRouter.post('/', (req, res, next) =>
  likePostController.add(req, res, next)
);
likePostRouter.delete('/', (req, res, next) =>
  likePostController.delete(req, res, next)
);

export default likePostRouter;
