import jwt from 'jsonwebtoken';
import { Token } from '../database/models/Token';

type payloadType = { email: string; id: number };

export default class TokenService {
  generateTokens = (payload: payloadType) => {
    const accessToken = jwt.sign(payload, 'jwt-secret-key', {
      expiresIn: '30m',
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
