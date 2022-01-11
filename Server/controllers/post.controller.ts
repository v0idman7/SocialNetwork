import { Request, Response, NextFunction } from 'express';
import PostService from '../services/post.service';
import ApiError from '../exceptions/api.error';

export default class PostController {
  service;

  constructor() {
    this.service = new PostService();
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, friend } = req.query;
      let postData = [];
      if (user && !friend) {
        postData = await this.service.getUserPost(+user);
      } else if (!user && friend) {
        postData = await this.service.getFriendsPost(+friend);
      } else if (user && friend) {
        const userPost = await this.service.getUserPost(+user);
        postData = await this.service.getFriendsPost(+friend);
        postData = postData.concat(userPost);
      } else {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      return res.json(postData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, name, text, photo } = req.body;
      const postData = await this.service.add(userID, name, text, photo);
      return res.json(postData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, postID, name, text, photo } = req.body;
      const postData = await this.service.update(
        userID,
        postID,
        name,
        text,
        photo
      );
      return res.json(postData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, postID } = req.body;
      const postData = await this.service.delete(userID, postID);
      return res.json(postData);
    } catch (e) {
      next(e);
    }
    return null;
  }
}
