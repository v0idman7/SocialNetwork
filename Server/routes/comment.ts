import { Router } from 'express';

import CommentController from '../controllers/comment.controller';
import authentication from '../middlewares/auth.middleware';

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.get('/', authentication, (req, res, next) =>
  commentController.get(req, res, next)
);
commentRouter.post('/', authentication, (req, res, next) =>
  commentController.add(req, res, next)
);
commentRouter.put('/', authentication, (req, res, next) =>
  commentController.update(req, res, next)
);
commentRouter.delete('/', authentication, (req, res, next) =>
  commentController.delete(req, res, next)
);

export default commentRouter;
