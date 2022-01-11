import { Router } from 'express';
import CommentController from '../controllers/comment.controller';

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.get('/', (req, res, next) =>
  commentController.get(req, res, next)
);
commentRouter.post('/', (req, res, next) =>
  commentController.add(req, res, next)
);
commentRouter.put('/', (req, res, next) =>
  commentController.update(req, res, next)
);
commentRouter.delete('/', (req, res, next) =>
  commentController.delete(req, res, next)
);

export default commentRouter;
