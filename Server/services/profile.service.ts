import ApiError from '../exceptions/api.error';
import { User } from '../database/models/User';
import { Social } from '../database/models/Social';

export default class ProfileService {
  async getUserData(id: number) {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id },
    });

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    return userData;
  }

  async getProfileData(id: number) {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id },
    });
    if (!userData) {
      throw ApiError.BadRequest(`Такого пользователя не существует`);
    }

    const userFriendsId =
      userData.friends === '' ? [] : userData.friends.split(' ');
    const userFriends = await Promise.all(
      userFriendsId.map(
        async (friend) =>
          await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id: +friend },
          })
      )
    );

    const userSocial = await Social.findOne({
      attributes: { exclude: ['id', 'user_id'] },
      where: { user_id: id },
    });

    const result = {
      user: userData,
      friends: userFriends,
      social: userSocial,
    };

    return result;
  }
}
