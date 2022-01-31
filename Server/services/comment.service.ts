import { Comment } from '../database/models';
import { Post } from '../database/models/Post';
import { User } from '../database/models/User';
import ApiError from '../exceptions/api.error';

export default class CommentService {
  async getComment(postID: number, userID: number) {
    const post = await Post.findOne({ where: { id: postID } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    const qcomments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
      ],
      where: { post_id: postID },
      order: [['id', 'ASC']],
    });

    const result = qcomments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      post_id: comment.post_id,
      user_id: comment.user_id,
      User: comment.User,
      commentOwner: comment!.User!.id === userID,
    }));
    return result;
  }

  async add(userID: number, postID: number, text: string) {
    console.log(userID, postID, text);
    const user = await User.findOne({ where: { id: userID } });
    if (!user) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }
    const post = await Post.findOne({ where: { id: postID } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    const comment = await Comment.create({
      text,
      post_id: postID,
      user_id: userID,
    });
    const result = await Comment.findOne({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'photo'],
        },
      ],
      where: { id: comment.id },
      order: [['id', 'ASC']],
    });
    return {
      id: result!.id,
      text: result!.text,
      post_id: result!.post_id,
      user_id: result!.user_id,
      User: result!.User,
      commentOwner: result!.User!.id === userID,
    };
  }

  async update(commentID: number, userID: number, text: string) {
    const comment = await Comment.findOne({ where: { id: commentID } });
    if (!comment) {
      throw ApiError.BadRequest('Такого комментария не существует');
    }
    if (comment.user_id !== userID) {
      throw ApiError.BadRequest('Вы не можете изменить чужой комментарий');
    }
    const updatedComment = await Comment.update(
      {
        text,
      },
      { where: { id: commentID } }
    );
    return updatedComment;
  }

  async delete(userID: number, commentID: number) {
    const comment = await Comment.findOne({ where: { id: commentID } });
    if (!comment) {
      throw ApiError.BadRequest('Такого комментария не существует');
    }
    const post = await Post.findOne({ where: { id: comment.post_id } });
    if (!post) {
      throw ApiError.BadRequest('Такого поста не существует');
    }
    if (comment.user_id !== (userID || post.user_id)) {
      throw ApiError.BadRequest('Вы не можете удалить комментарий');
    }
    const deletedComment = await Comment.destroy({ where: { id: commentID } });
    return deletedComment;
  }
}
