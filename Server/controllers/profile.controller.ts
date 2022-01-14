import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import ProfileService from '../services/profile.service';

export default class ProfileController {
  service;

  constructor() {
    this.service = new ProfileService();
  }

  async getProfileData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (typeof req.user !== 'string') {
        const profileData = await this.service.getProfileData(req.user?.id);
        return res.json(profileData);
      }
      throw ApiError.UnauthorizedError();
    } catch (e) {
      next(e);
    }
    return null;
  }
}
