import { Response, NextFunction } from 'express';
import PostService from '../services/post.service';
import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';

export default class PostController {
  service;

  constructor() {
    this.service = new PostService();
  }

  async get(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { user, friend } = req.query;
      let postData = [];
      if (user && !friend) {
        postData = await this.service.getUserPost(userID);
      } else if (!user && friend) {
        postData = await this.service.getFriendsPost(userID);
      } else if (user && friend) {
        postData = await this.service.getUserAndFriendsPost(userID);
      } else {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      return res.json(postData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async add(req: AuthRequest, res: Response, next: NextFunction) {
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
    return null;
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { postID, text, photo } = req.body;
      const postData = await this.service.update(userID, postID, text, photo);
      return res.json(postData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { postID } = req.body;
      const postData = await this.service.delete(userID, postID);
      return res.json(postData);
    } catch (e) {
      next(e);
    }
    return null;
  }
}
