import { Response, NextFunction } from 'express';

import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import ProfileService from '../services/profile.service';

export default class ProfileController {
  private service = new ProfileService();

  getProfileData = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const { id } = req.query;
      if (id) {
        const profileData = await this.service.getProfileData(+id);
        return res.json(profileData);
      }
      const profileData = await this.service.getProfileData(userID);
      return res.json(profileData);
    } catch (e) {
      next(e);
    }
  };

  updateProfileData = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let userID = 0;
      if (typeof req.user !== 'string') {
        userID = req.user?.id;
      }
      const profile = req.body;
      const updateProfile = await this.service.updateProfileData(
        userID,
        profile
      );
      if (!updateProfile) {
        throw ApiError.UnauthorizedError();
      }
      return res.json(updateProfile);
    } catch (e) {
      next(e);
    }
  };
}
