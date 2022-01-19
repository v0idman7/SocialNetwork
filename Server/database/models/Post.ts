import { Association, DataTypes, Model } from 'sequelize';
import sequelize from '../database.state';
import { User } from './User';

export interface PostInstance extends Model {
  id: number;
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
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photo: {
      type: DataTypes.TEXT,
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

Post.belongsTo(User, { foreignKey: 'user_id', constraints: false });
User.hasMany(Post, { foreignKey: 'user_id', constraints: false });
