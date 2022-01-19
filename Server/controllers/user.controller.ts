import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import UserService from '../services/user.service';

export default class UserController {
  service;

  constructor() {
    this.service = new UserService();
  }

  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, phone, email, password } = req.body;
      const userData = await this.service.registration(
        firstName,
        lastName,
        phone,
        email,
        password
      );
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await this.service.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const token = await this.service.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this.service.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
    return null;
  }

  async getUserData(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (typeof req.user !== 'string') {
        const userData = await this.service.getUserData(req.user?.id);
        return res.json(userData);
      }
      throw ApiError.UnauthorizedError();
    } catch (e) {
      next(e);
    }
    return null;
  }
}
