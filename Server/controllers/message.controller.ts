import { Response, NextFunction } from 'express';

import { AuthRequest } from '../middlewares/auth.middleware';
import MessageService from '../services/message.service';

export default class MessageController {
  private service = new MessageService();

  get = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { id } = req.query;
      const messages = await this.service.getMessage(+id!, userID);
      return res.json(messages);
    } catch (e) {
      next(e);
    }
  };
}
