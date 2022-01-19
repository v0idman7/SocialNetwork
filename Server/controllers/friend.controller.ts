import { Request, Response, NextFunction } from 'express';
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

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, friendID } = req.body;
      const userData = await this.service.add(userID, friendID);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, friendID } = req.body;
      const userData = await this.service.delete(userID, friendID);
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
