import { Router } from 'express';
import PostController from '../controllers/post.controller';

const postRouter = Router();
const postController = new PostController();

postRouter.get('/', (req, res, next) => postController.get(req, res, next));
postRouter.post('/', (req, res, next) => postController.add(req, res, next));
postRouter.put('/', (req, res, next) => postController.update(req, res, next));
postRouter.delete('/', (req, res, next) =>
  postController.delete(req, res, next)
);

export default postRouter;
