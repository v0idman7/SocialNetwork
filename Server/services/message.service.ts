import { Op } from 'sequelize';
import { Chat, Message } from '../database/models';
import ApiError from '../exceptions/api.error';

export default class MessageService {
  getMessage = async (chatId: number, userId: number) => {
    const chat = await Chat.findOne({
      where: {
        [Op.and]: [
          { id: chatId },
          { [Op.or]: [{ firstUser_id: userId }, { secondUser_id: userId }] },
        ],
      },
    });
    if (!chat) {
      throw ApiError.BadRequest('Вы не состоите в этом чате');
    }

    const messages = await Message.findAll({ where: { chat_id: chatId } });
    return messages;
  };

  addMessage = async (chatId: number, userId: number, message: string) => {
    const result = await Message.create({
      chat_id: chatId,
      message,
      user_id: userId,
    });
    if (!result) {
      throw ApiError.BadRequest('Непредвиденная ошибка');
    }
    return result;
  };
}
