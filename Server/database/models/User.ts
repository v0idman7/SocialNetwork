import { DataTypes, Model } from 'sequelize';
import { Post } from '.';
import sequelize from '../database.state';

export interface UserInstance extends Model {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  friends: string;
  photo: string;
}

export const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    friends: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
  },
  {
    timestamps: false,
  }
);
