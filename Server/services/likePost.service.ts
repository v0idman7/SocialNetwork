import { LikePost } from '../database/models/LikePost';
import { Post } from '../database/models/Post';
import { User } from '../database/models/User';
import ApiError from '../exceptions/api.error';

export default class LikePostService {
  async get(postID: number) {
    const post = await Post.findOne({ where: { id: postID } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    const result = await LikePost.findAll({
      where: { post_id: postID },
      order: [['id', 'ASC']],
    });

    return result;
  }

  async add(postID: number, userID: number) {
    const user = await User.findOne({ where: { id: userID } });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }
    const post = await Post.findOne({ where: { id: postID } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    const comment = await LikePost.create({
      post_id: postID,
      user_id: userID,
    });
    return comment;
  }

  async delete(userID: number, likePostID: number) {
    const likePost = await LikePost.findOne({ where: { id: likePostID } });
    if (!likePost) {
      throw ApiError.BadRequest('Вы не поставили лайк');
    }
    if (likePost.user_id !== userID) {
      throw ApiError.BadRequest('Вы не можете удалить лайк');
    }
    const deletedLikePost = await LikePost.destroy({
      where: { id: likePostID },
    });
    return deletedLikePost;
  }
}
