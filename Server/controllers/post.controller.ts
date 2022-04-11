import { Response, NextFunction } from 'express';

import PostService from '../services/post.service';
import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';

export default class PostController {
  private service = new PostService();

  get = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { page, user, friend } = req.query;
      let postData = [];
      if (!page) {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      if (user && !friend) {
        postData = await this.service.getUserPost(userID, +page);
      } else if (!user && friend) {
        postData = await this.service.getFriendsPost(userID, +page);
      } else if (user && friend) {
        postData = await this.service.getUserAndFriendsPost(userID, +page);
      } else {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      return res.json(postData);
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
      const { text, filesname } = req.body;
      const postData = await this.service.add(userID, text, filesname);
      return res.json(postData);
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
      const { id } = req.query;
      if (!id) {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      const postData = await this.service.delete(userID, +id);
      return res.json(postData);
    } catch (e) {
      next(e);
    }
  };
}