import { LikePost, LikePostInstance } from '../database/models/LikePost';
import { Post } from '../database/models/Post';
import { User } from '../database/models/User';
import ApiError from '../exceptions/api.error';

export interface ILikePostService {
  get: (postID: number) => Promise<Array<LikePostInstance>>;
  add: (
    postID: number,
    userID: number,
    like: boolean
  ) => Promise<
    | {
        newLike: null;
        change?: undefined;
      }
    | {
        newLike: [number, Array<LikePostInstance>];
        change: boolean;
      }
    | {
        newLike: LikePostInstance;
        change: boolean;
      }
  >;
  delete: (userID: number, likePostID: number) => Promise<number>;
}

export default class LikePostService implements ILikePostService {
  get = async (postID: number) => {
    const post = await Post.findOne({ where: { id: postID } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    const result = await LikePost.findAll({
      where: { post_id: postID },
      order: [['id', 'ASC']],
    });

    return result;
  };

  add = async (postID: number, userID: number, like: boolean) => {
    const user = await User.findOne({ where: { id: userID } });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }
    const post = await Post.findOne({ where: { id: postID } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    const userLike = await LikePost.findOne({
      where: { post_id: postID, user_id: userID },
    });

    if (userLike && userLike.like === like) {
      const newLike = await LikePost.destroy({ where: { id: userLike.id } });
      return { newLike: null };
    }
    if (userLike && userLike.like !== like) {
      const newLike = await LikePost.update(
        { like },
        { where: { id: userLike.id } }
      );
      return { newLike, change: true };
    }
    const newLike = await LikePost.create({
      post_id: postID,
      like,
      user_id: userID,
    });
    return { newLike, change: false };
  };

  delete = async (userID: number, likePostID: number) => {
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
  };
}
