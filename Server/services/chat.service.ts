import { Op } from 'sequelize';

import { Message } from '../database/models';
import { Chat } from '../database/models/Chat';
import { User, UserInstance } from '../database/models/User';
import ApiError from '../exceptions/api.error';

export interface IChatService {
  getChat: (userId: number) => Promise<
    Array<{
      id: number;
      user_id: number;
      friend_id: number;
      friend: UserInstance | undefined;
    }>
  >;
  addChat: (
    userId: number,
    friendId: number
  ) => Promise<{
    id: number;
    user_id: number;
    friend_id: number;
    friend: UserInstance | undefined;
  }>;
  deleteChat: (userId: number, chatId: number) => Promise<number>;
}

export default class ChatService implements IChatService {
  getChat = async (userId: number) => {
    const chats = await Chat.findAll({
      include: [
        {
          as: 'firstUser',
          model: User,
          attributes: ['firstName', 'lastName', 'photo'],
        },
        {
          as: 'secondUser',
          model: User,
          attributes: ['firstName', 'lastName', 'photo'],
        },
      ],
      where: { [Op.or]: [{ firstUser_id: userId }, { secondUser_id: userId }] },
    });
    if (chats.length === 0) {
      throw ApiError.BadRequest('У этого пользователя нет чатов');
    }
    const result = chats.map((chat) => {
      if (chat.firstUser_id === userId && chat.secondUser_id !== userId) {
        return {
          id: chat.id,
          user_id: chat.firstUser_id,
          friend_id: chat.secondUser_id,
          friend: chat.secondUser,
        };
      }
      return {
        id: chat.id,
        user_id: chat.secondUser_id,
        friend_id: chat.firstUser_id,
        friend: chat.firstUser,
      };
    });
    return result;
  };

  addChat = async (userId: number, friendId: number) => {
    const friend = await User.findOne({ where: { id: friendId } });
    if (!friend) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }
    let chat = await Chat.findOne({
      include: [
        {
          as: 'firstUser',
          model: User,
          attributes: ['firstName', 'lastName', 'photo'],
        },
        {
          as: 'secondUser',
          model: User,
          attributes: ['firstName', 'lastName', 'photo'],
        },
      ],
      where: {
        [Op.or]: [
          { firstUser_id: userId, secondUser_id: friendId },
          { firstUser_id: friendId, secondUser_id: userId },
        ],
      },
    });
    if (!chat) {
      const newChat = await Chat.create({
        firstUser_id: userId,
        secondUser_id: friendId,
      });
      chat = await Chat.findOne({
        include: [
          {
            as: 'firstUser',
            model: User,
            attributes: ['firstName', 'lastName', 'photo'],
          },
          {
            as: 'secondUser',
            model: User,
            attributes: ['firstName', 'lastName', 'photo'],
          },
        ],
        where: {
          id: newChat.id,
        },
      });
    }
    if (!chat) throw ApiError.BadRequest('Непредвиденная ошибка');
    if (chat.firstUser_id === userId && chat.secondUser_id !== userId) {
      return {
        id: chat.id,
        user_id: chat.firstUser_id,
        friend_id: chat.secondUser_id,
        friend: chat.secondUser,
      };
    }
    return {
      id: chat.id,
      user_id: chat.secondUser_id,
      friend_id: chat.firstUser_id,
      friend: chat.firstUser,
    };
  };

  deleteChat = async (userId: number, chatId: number) => {
    const chat = await Chat.findOne({ where: { id: chatId } });
    if (!chat) {
      throw ApiError.BadRequest('Такого чата не существует');
    }
    if (chat.firstUser_id !== +userId && chat.secondUser_id !== +userId) {
      throw ApiError.BadRequest('Вы не можете удалить этот чат');
    }
    const destroyMessage = await Message.destroy({
      where: { chat_id: chatId },
    });
    const destroyChat = await Chat.destroy({
      where: { id: chatId },
    });
    return destroyChat;
  };
}
