import { Response, NextFunction } from 'express';

import { AuthRequest } from '../middlewares/auth.middleware';
import LikePostService from '../services/likePost.service';

export default class LikePostController {
  private service = new LikePostService();

  add = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { id, like } = req.body;
      const likePostData = await this.service.add(id, userID, like);
      return res.json(likePostData);
    } catch (e) {
      next(e);
    }
  };
}
