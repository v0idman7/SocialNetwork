import { Response, NextFunction } from 'express';

import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import FriendService from '../services/friend.service';

export default class FriendController {
  private service = new FriendService();

  getFriends = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
  };

  checkFriend = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
  };

  getOther = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
  };

  add = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
      const userData = await this.service.delete(userID, +id);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
  };
}
