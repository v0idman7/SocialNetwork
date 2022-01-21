import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import ChatService from '../services/chat.service';

export default class ChatController {
  service;

  constructor() {
    this.service = new ChatService();
  }

  async get(req: AuthRequest, res: Response, next: NextFunction) {
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
    return null;
  }

  async add(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { friendID } = req.body;
      const chat = await this.service.addChat(userID, friendID);
      return res.json(chat);
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
      const { id } = req.body;
      const chat = await this.service.deleteChat(userID, id);
      return res.json(chat);
    } catch (e) {
      next(e);
    }
    return null;
  }
}
