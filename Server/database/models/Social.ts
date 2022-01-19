import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.state';
import { User } from './User';

export interface SocialInstance extends Model {
  id: number;
  vk: string;
  instagram: string;
  facebook: string;
  github: string;
  linkedIn: string;
  user_id: number;
}

export const Social = sequelize.define<SocialInstance>(
  'Social',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vk: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedIn: {
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

Social.belongsTo(User, { foreignKey: 'user_id', constraints: false });
User.hasMany(Social, { foreignKey: 'user_id', constraints: false });
