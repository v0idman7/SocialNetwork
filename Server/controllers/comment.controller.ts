import { Response, NextFunction } from 'express';

import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import CommentService from '../services/comment.service';

export default class CommentController {
  private service = new CommentService();

  get = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { post } = req.query;
      if (!post) {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      const comments = await this.service.getComment(+post, userID);
      return res.json(comments);
    } catch (e) {
      next(e);
    }
  };

  add = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { post, text } = req.body;
      const commentData = await this.service.add(userID, post, text);
      return res.json(commentData);
    } catch (e) {
      next(e);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { commentID, userID, text } = req.body;
      const commentData = await this.service.update(commentID, userID, text);
      return res.json(commentData);
    } catch (e) {
      next(e);
    }
  };

  delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { id } = req.body;
      const commentData = await this.service.delete(userID, id);
      return res.json(commentData);
    } catch (e) {
      next(e);
    }
  };
}
