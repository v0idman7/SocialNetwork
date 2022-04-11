import { Response, NextFunction } from 'express';

import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import ChatService from '../services/chat.service';

export default class ChatController {
  private service = new ChatService();

  get = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const chats = await this.service.getChat(userID);
      return res.json(chats);
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
      const chat = await this.service.addChat(userID, +id);
      return res.json(chat);
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
      const chat = await this.service.deleteChat(userID, +id);
      return res.json(chat);
    } catch (e) {
      next(e);
    }
  };
}
