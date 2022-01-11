import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../exceptions/api.error';
import TokenService from '../services/token.service';

const tokenService = new TokenService();

export interface AuthRequest extends Request {
  user?: JwtPayload | string;
}

export default function authentication(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
  return null;
}
