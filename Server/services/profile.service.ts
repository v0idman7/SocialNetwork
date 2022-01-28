import ApiError from '../exceptions/api.error';
import { User } from '../database/models/User';
import { Social } from '../database/models/Social';
import { Op } from 'sequelize';

interface EditProfileValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vk: string;
  instagram: string;
  facebook: string;
  github: string;
  linkedIn: string;
}

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
    const userFriends = await User.findAll({
      attributes: { exclude: ['password'] },
      where: { id: { [Op.in]: userFriendsId } },
    });

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

  async updateProfileData(id: number, profile: EditProfileValues) {
    const userData = await User.findOne({
      where: { id },
    });
    if (!userData) {
      throw ApiError.BadRequest(`Такого пользователя не существует`);
    }

    const updateUser = await User.update(
      {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
      },
      { where: { id } }
    );

    const userSocial = await Social.findOne({
      where: { user_id: id },
    });

    if (userSocial) {
      const updateSocial = await Social.update(
        {
          vk: profile.vk,
          instagram: profile.instagram,
          facebook: profile.facebook,
          github: profile.github,
          linkedIn: profile.linkedIn,
        },
        { where: { user_id: id } }
      );
      if (updateUser && updateSocial) {
        return id;
      }
    }
    const newSocial = await Social.create({
      vk: profile.vk,
      instagram: profile.instagram,
      facebook: profile.facebook,
      github: profile.github,
      linkedIn: profile.linkedIn,
      user_id: id,
    });

    if (updateUser && newSocial) {
      return id;
    }
    return false;
  }
}
