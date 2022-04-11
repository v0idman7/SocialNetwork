import jwt from 'jsonwebtoken';

import { Token, TokenInstance } from '../database/models/Token';

type payloadType = { email: string; id: number };

export interface ITokenService {
  generateTokens: (payload: payloadType) => {
    accessToken: string;
    refreshToken: string;
  };
  saveToken: (
    userID: number,
    refreshToken: string
  ) => Promise<TokenInstance | [number, Array<TokenInstance>]>;
  validateAccessToken: (token: string) => string | jwt.JwtPayload | null;
  validateRefreshToken: (token: string) => string | jwt.JwtPayload | null;
  removeToken: (refreshToken: string) => Promise<number>;
  findToken: (refreshToken: string) => Promise<TokenInstance | null>;
}

export default class TokenService implements ITokenService {
  generateTokens = (payload: payloadType) => {
    const accessToken = jwt.sign(payload, 'jwt-secret-key', {
      expiresIn: '1d',
    });
    const refreshToken = jwt.sign(payload, 'jwt-refresh-secret-key', {
      expiresIn: '10d',
    });
    return {
      accessToken,
      refreshToken,
    };
  };

  saveToken = async (userID: number, refreshToken: string) => {
    const tokenData = await Token.findOne({ where: { user_id: userID } });
    if (tokenData) {
      const result = await Token.update(
        { refreshToken },
        { where: { user_id: userID } }
      );
      return result;
    }
    const result = await Token.create({
      refreshToken,
      user_id: userID,
    });
    return result;
  };

  validateAccessToken = (token: string) => {
    try {
      const userData = jwt.verify(token, 'jwt-secret-key');
      return userData;
    } catch (e) {
      return null;
    }
  };

  validateRefreshToken = (token: string) => {
    try {
      const userData = jwt.verify(token, 'jwt-refresh-secret-key');
      return userData;
    } catch (e) {
      return null;
    }
  };

  removeToken = async (refreshToken: string) => {
    const tokenData = await Token.destroy({ where: { refreshToken } });
    return tokenData;
  };

  findToken = async (refreshToken: string) => {
    const tokenData = await Token.findOne({ where: { refreshToken } });
    return tokenData;
  };
}
