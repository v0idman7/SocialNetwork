import bcrypt from 'bcrypt';

import TokenService from './token.service';
import UserDto from '../dtos/user.dto';
import ApiError from '../exceptions/api.error';
import { User, UserInstance } from '../database/models/User';

const tokenService = new TokenService();

export interface IUserService {
  registration: (
    firstName: string,
    lastName: string,
    phone: number,
    email: string,
    password: string
  ) => Promise<{
    user: UserDto;
    accessToken: string;
    refreshToken: string;
  }>;
  login: (
    email: string,
    password: string
  ) => Promise<{
    user: UserDto;
    accessToken: string;
    refreshToken: string;
  }>;
  logout: (refreshToken: string) => Promise<number>;
  refresh: (refreshToken: string) => Promise<{
    user: UserDto;
    accessToken: string;
    refreshToken: string;
  }>;
  getUserData: (id: number) => Promise<UserInstance>;
}

export default class UserService implements IUserService {
  registration = async (
    firstName: string,
    lastName: string,
    phone: number,
    email: string,
    password: string
  ) => {
    const userID = await User.findOne({ attributes: ['id'], where: { email } });
    if (userID) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password: bcrypt.hashSync(password, 7),
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  };

  login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    }
    throw ApiError.BadRequest('Неверный email или пароль');
  };

  logout = async (refreshToken: string) => {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  };

  refresh = async (refreshToken: string) => {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    if (typeof userData === 'string') {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findOne({ where: { id: userData.id } });

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  };

  getUserData = async (id: number) => {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id },
    });

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    return userData;
  };
}
