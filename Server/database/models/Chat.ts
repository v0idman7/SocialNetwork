import { DataTypes, Model } from 'sequelize';
import { UserInstance } from '.';
import sequelize from '../database.state';
import { User } from './User';

export interface ChatInstance extends Model {
  id: number;
  firstUser_id: number;
  secondUser_id: number;
  firstUser?: UserInstance;
  secondUser?: UserInstance;
}

export const Chat = sequelize.define<ChatInstance>(
  'Chat',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstUser_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    secondUser_id: {
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

Chat.belongsTo(User, {
  as: 'firstUser',
  foreignKey: 'firstUser_id',
  constraints: false,
});
User.hasMany(Chat, {
  as: 'firstUser',
  foreignKey: 'firstUser_id',
  constraints: false,
});

Chat.belongsTo(User, {
  as: 'secondUser',
  foreignKey: 'secondUser_id',
  constraints: false,
});
User.hasMany(Chat, {
  as: 'secondUser',
  foreignKey: 'secondUser_id',
  constraints: false,
});
