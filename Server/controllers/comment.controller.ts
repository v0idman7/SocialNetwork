import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';
import CommentService from '../services/comment.service';

export default class CommentController {
  service;

  constructor() {
    this.service = new CommentService();
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { post } = req.query;
      if (!post) {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      const comments = await this.service.getComment(+post);
      return res.json(comments);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, postID, text } = req.body;
      const commentData = await this.service.add(userID, postID, text);
      return res.json(commentData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentID, userID, text } = req.body;
      const commentData = await this.service.update(commentID, userID, text);
      return res.json(commentData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, commentID } = req.body;
      const commentData = await this.service.delete(userID, commentID);
      return res.json(commentData);
    } catch (e) {
      next(e);
    }
    return null;
  }
}
