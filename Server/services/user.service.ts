import bcrypt from 'bcrypt';
import TokenService from './token.service';
import UserDto from '../dtos/user.dto';
import ApiError from '../exceptions/api.error';
import { User } from '../database/models/User';

const tokenService = new TokenService();

export default class UserService {
  async registration(
    firstName: string,
    lastName: string,
    phone: number,
    username: string,
    email: string,
    password: string
  ) {
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
      username,
      email,
      password: bcrypt.hashSync(password, 7),
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return { ...tokens, user: userDto };
    }
    throw ApiError.BadRequest('Неверный email или пароль');
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
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
  }
}
