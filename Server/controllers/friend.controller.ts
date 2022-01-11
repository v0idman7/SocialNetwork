import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';
import FriendService from '../services/friend.service';

export default class FriendController {
  service;

  constructor() {
    this.service = new FriendService();
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      if (!id) {
        throw ApiError.BadRequest('Неверные параметры запроса');
      }
      const userData = await this.service.get(+id);
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
}
