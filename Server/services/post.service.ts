import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';

import { LikePost } from '../database/models';
import { Post, PostInstance } from '../database/models/Post';
import { User } from '../database/models/User';
import ApiError from '../exceptions/api.error';

const pathImages = path.resolve(__dirname, '../images');

export interface IPostService {
  getUserPost: (userID: number, page: number) => Promise<Array<PostInstance>>;
  getUserAndFriendsPost: (
    userID: number,
    page: number
  ) => Promise<Array<PostInstance>>;
  getFriendsPost: (
    userID: number,
    page: number
  ) => Promise<Array<PostInstance>>;
  add: (
    userID: number,
    text: string,
    filesname: string
  ) => Promise<PostInstance | null>;
  update: (
    userID: number,
    postID: number,
    text: string,
    photo: string
  ) => Promise<[number, Array<PostInstance>]>;
  delete: (userID: number, postID: number) => Promise<number>;
}

export default class PostService implements IPostService {
  getUserPost = async (userID: number, page: number) => {
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
        {
          model: LikePost,
        },
      ],
      where: { user_id: userID },
      order: [['id', 'DESC']],
    });

    return result;
  };

  getUserAndFriendsPost = async (userID: number, page: number) => {
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
        {
          model: LikePost,
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
  };

  getFriendsPost = async (userID: number, page: number) => {
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
        {
          model: LikePost,
        },
      ],
      where: { user_id: { [Op.in]: userFriends } },
      order: [['id', 'DESC']],
    });
    return result;
  };

  add = async (userID: number, text: string, filesname: string) => {
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
        {
          model: LikePost,
        },
      ],
      where: { id: post.id },
    });

    return result;
  };

  update = async (
    userID: number,
    postID: number,
    text: string,
    photo: string
  ) => {
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
  };

  delete = async (userID: number, postID: number) => {
    const post = await Post.findOne({ where: { id: postID } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    if (post.user_id !== userID) {
      throw ApiError.BadRequest('Вы не можете удалить чужой пост');
    }
    const imgArr = post.photo.split(' ');
    console.log(imgArr);
    await LikePost.destroy({ where: { post_id: postID } });
    const deletedPost = await Post.destroy({ where: { id: postID } });
    imgArr.forEach(
      (img) =>
        img &&
        fs.unlink(`${pathImages}/${img}`, (err) => {
          if (err) throw err;
        })
    );
    return deletedPost;
  };
}
