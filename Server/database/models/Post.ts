import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.state';
import { User } from './User';

export interface PostInstance extends Model {
  id: number;
  name: string;
  text: string;
  photo: string;
  user_id: number;
}

export const Post = sequelize.define<PostInstance>(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
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
