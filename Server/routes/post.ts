import { Router } from 'express';
import PostController from '../controllers/post.controller';
import authentication from '../middlewares/auth.middleware';

const postRouter = Router();
const postController = new PostController();

postRouter.get('/', authentication, (req, res, next) =>
  postController.get(req, res, next)
);
postRouter.post('/', authentication, (req, res, next) =>
  postController.add(req, res, next)
);
postRouter.put('/', authentication, (req, res, next) =>
  postController.update(req, res, next)
);
postRouter.delete('/', authentication, (req, res, next) =>
  postController.delete(req, res, next)
);

export default postRouter;
