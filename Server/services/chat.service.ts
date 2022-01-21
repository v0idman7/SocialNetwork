import { Op } from 'sequelize';
import { Chat, ChatInstance } from '../database/models/Chat';
import { User } from '../database/models/User';
import ApiError from '../exceptions/api.error';

export default class ChatService {
  async getChat(userId: number) {
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
          user_id: chat.secondUser_id,
          user: chat.secondUser,
        };
      }
      return {
        id: chat.id,
        user_id: chat.firstUser_id,
        user: chat.firstUser,
      };
    });
    return result;
  }

  async addChat(userId: number, friendId: number) {
    const friend = await User.findOne({ where: { id: friendId } });
    if (!friend) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }
    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { firstUser_id: userId, secondUser_id: friendId },
          { firstUser_id: friendId, secondUser_id: userId },
        ],
      },
    });
    if (chat) {
      throw ApiError.BadRequest('Чат с этип пользователеи уже существует');
    }
    const newChat = await Chat.create({
      firstUser_id: userId,
      secondUser_id: friendId,
    });
    return newChat.id;
  }

  async deleteChat(userId: number, chatId: number) {
    const chat = await Chat.findOne({ where: { id: chatId } });
    if (!chat) {
      throw ApiError.BadRequest('Такого чата не существует');
    }
    if (chat.firstUser_id !== +userId && chat.secondUser_id !== +userId) {
      throw ApiError.BadRequest('Вы не можете удалить этот чат');
    }
    const destroyChat = await Chat.destroy({
      where: { id: chatId },
    });
    return destroyChat;
  }
}
