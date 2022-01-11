import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';
import LikePostService from '../services/likePost.service';

export default class LikePostController {
  service;

  constructor() {
    this.service = new LikePostService();
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { post } = req.query;
      if (!post) {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      const likePost = await this.service.get(+post);
      return res.json(likePost);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { postID, userID } = req.body;
      const likePostData = await this.service.add(postID, userID);
      return res.json(likePostData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, likePostID } = req.body;
      const likePostData = await this.service.delete(userID, likePostID);
      return res.json(likePostData);
    } catch (e) {
      next(e);
    }
    return null;
  }
}
