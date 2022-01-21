import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.state';
import { Chat } from './Chat';
import { User } from './User';

export interface MessageInstance extends Model {
  id: number;
  chat_id: number;
  message: string;
  user_id: number;
}

export const Message = sequelize.define<MessageInstance>(
  'Message',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Message.belongsTo(User, { foreignKey: 'user_id', constraints: false });
User.hasMany(Message, { foreignKey: 'user_id', constraints: false });

Message.belongsTo(Chat, { foreignKey: 'chat_id', constraints: false });
Chat.hasMany(Message, { foreignKey: 'chat_id', constraints: false });
