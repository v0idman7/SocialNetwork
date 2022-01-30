import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import LikePostService from '../services/likePost.service';

export default class LikePostController {
  service;

  constructor() {
    this.service = new LikePostService();
  }

  async add(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { id, like } = req.body;
      const likePostData = await this.service.add(id, userID, like);
      return res.json(likePostData);
    } catch (e) {
      next(e);
    }
    return null;
  }
}
