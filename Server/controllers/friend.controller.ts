import { Request, Response, NextFunction, query } from 'express';
import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import FriendService from '../services/friend.service';

export default class FriendController {
  service;

  constructor() {
    this.service = new FriendService();
  }

  async getFriends(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const userData = await this.service.getFriends(+userID);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async checkFriend(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { id } = req.query;
      if (!id) {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      const isFriend = await this.service.checkFriend(+userID, +id);
      return res.json(isFriend);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async getOther(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const userData = await this.service.getOther(+userID);
      return res.json(userData);
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
      const { id } = req.query;
      if (!id) {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      const userData = await this.service.add(userID, +id);
      return res.json(userData);
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
      const { id } = req.query;
      if (!id) {
        throw ApiError.BadRequest('Запрос с неверными параметрами или без них');
      }
      const userData = await this.service.delete(userID, +id);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { search } = req.query;
      if (typeof search === 'string') {
        const result = await this.service.getAll(userID, search);
        return res.json(result);
      } else {
        const result = await this.service.getAll(userID);
        return res.json(result);
      }
    } catch (e) {
      next(e);
    }
    return null;
  }
}
