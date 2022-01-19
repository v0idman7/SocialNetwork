import { User } from '../database/models/User';
import ApiError from '../exceptions/api.error';
import { Op } from 'sequelize';

export default class FriendService {
  async getFriends(userID: number) {
    const user = await User.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    const userFriends = user.friends === '' ? [] : user.friends.split(' ');
    if (userFriends === []) {
      throw ApiError.BadRequest('У этого пользователя нет друзей');
    }

    const result = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'photo'],
      where: {
        id: {
          [Op.in]: userFriends,
          [Op.ne]: userID,
        },
      },
    });

    return result;
  }

  async getOther(userID: number) {
    const user = await User.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    const userFriends = user.friends === '' ? [] : user.friends.split(' ');
    if (userFriends === []) {
      throw ApiError.BadRequest('У этого пользователя нет друзей');
    }

    const result = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'photo'],
      where: {
        id: {
          [Op.notIn]: userFriends,
          [Op.ne]: userID,
        },
      },
    });

    return result;
  }

  async add(userID: number, friendID: number) {
    if (userID === friendID) {
      throw ApiError.BadRequest('Вы не можете добавить себя в друзья');
    }

    const user = await User.findOne({ where: { id: userID } });
    const friend = await User.findOne({ where: { id: friendID } });
    if (!user || !friend) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    const userFriends = user.friends === '' ? [] : user.friends.split(' ');
    if (userFriends.includes(friendID.toString())) {
      throw ApiError.BadRequest('Этот пользователь уже у вас в друзьях');
    }

    userFriends.push(friendID.toString());
    const result = await User.update(
      { friends: userFriends.join(' ') },
      { where: { id: userID } }
    );

    return result;
  }

  async delete(userID: number, friendID: number) {
    if (userID === friendID) {
      throw ApiError.BadRequest('Вы не можете удалить себя из друзей');
    }

    const user = await User.findOne({ where: { id: userID } });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    let userFriends = user.friends === null ? [] : user.friends.split(' ');
    if (!userFriends.includes(friendID.toString())) {
      throw ApiError.BadRequest('Этого пользователя нет у вас в друзьях');
    }

    userFriends = userFriends.filter(
      (friend) => friend !== friendID.toString()
    );
    const result = await User.update(
      { friends: userFriends.join(' ') },
      { where: { id: userID } }
    );

    return result;
  }

  async getAll(user_id: number, search?: string) {
    if (search) {
      return User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'photo'],
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              lastName: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
          id: {
            [Op.ne]: user_id,
          },
        },
      });
    } else {
      return User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'photo'],
        where: {
          id: {
            [Op.ne]: user_id,
          },
        },
      });
    }
  }
}
