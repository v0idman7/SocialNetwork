import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import { Post } from '../database/models/Post';
import { User } from '../database/models/User';
import ApiError from '../exceptions/api.error';

const pathImages = path.resolve(__dirname, '../images');

export default class PostService {
  async getUserPost(userID: number, page: number) {
    const user = await User.findOne({ where: { id: userID } });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    const result = await Post.findAll({
      offset: (page - 1) * 10,
      limit: 10,
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
      ],
      where: { user_id: userID },
      order: [['id', 'DESC']],
    });

    return result;
  }

  async getUserAndFriendsPost(userID: number, page: number) {
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

    const result = await Post.findAll({
      offset: (page - 1) * 10,
      limit: 10,
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
      ],
      where: {
        [Op.or]: [
          { user_id: { [Op.in]: userFriends } },
          { user_id: { [Op.eq]: userID } },
        ],
      },
      order: [['id', 'DESC']],
    });
    return result;
  }

  async getFriendsPost(userID: number, page: number) {
    console.log('friend');
    const user = await User.findOne({ where: { id: userID } });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }
    const userFriends = user.friends === '' ? [] : user.friends.split(' ');
    if (userFriends === []) {
      throw ApiError.BadRequest('У этого пользователя нет друзей');
    }

    const result = await Post.findAll({
      offset: (page - 1) * 10,
      limit: 10,
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
      ],
      where: { user_id: { [Op.in]: userFriends } },
      order: [['id', 'DESC']],
    });
    return result;
  }

  async add(userID: number, text: string, filesname: string) {
    const user = await User.findOne({ where: { id: userID } });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }
    const post = await Post.create({
      text,
      photo: filesname,
      user_id: userID,
    });

    const result = await Post.findOne({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
      ],
      where: { id: post.id },
    });

    return result;
  }

  async update(userID: number, postID: number, text: string, photo: string) {
    const post = await Post.findOne({ where: { id: postID } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    if (post.user_id !== userID) {
      throw ApiError.BadRequest('Вы не можете изменить чужой пост');
    }
    const updatedPost = await Post.update(
      {
        text,
        photo,
      },
      { where: { id: postID } }
    );
    return updatedPost;
  }

  async delete(userID: number, postID: number) {
    const post = await Post.findOne({ where: { id: postID } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    if (post.user_id !== userID) {
      throw ApiError.BadRequest('Вы не можете удалить чужой пост');
    }
    const imgArr = post.photo.split(' ');
    console.log(imgArr);
    const deletedPost = await Post.destroy({ where: { id: postID } }).then(() =>
      imgArr.forEach(
        (img) =>
          img &&
          fs.unlink(`${pathImages}/${img}`, (err) => {
            if (err) throw err;
          })
      )
    );
    return deletedPost;
  }
}
