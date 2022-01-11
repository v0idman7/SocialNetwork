import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.state';
import { User } from './User';

export interface TokenInstance extends Model {
  id: number;
  refreshToken: string;
  user_id: string;
}

export const Token = sequelize.define<TokenInstance>(
  'Token',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
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
