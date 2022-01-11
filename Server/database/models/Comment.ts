import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.state';
import { Post } from './Post';
import { User } from './User';

export interface CommentInstance extends Model {
  id: number;
  text: string;
  post_id: number;
  user_id: number;
}

export const Comment = sequelize.define<CommentInstance>(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'id',
      },
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
