import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.state';
import { Post } from './Post';
import { User } from './User';

export interface LikePostInstance extends Model {
  id: number;
  post_id: number;
  user_id: number;
}

export const LikePost = sequelize.define<LikePostInstance>(
  'LikePost',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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

LikePost.belongsTo(User, { foreignKey: 'user_id', constraints: false });
User.hasMany(LikePost, { foreignKey: 'user_id', constraints: false });

LikePost.belongsTo(Post, { foreignKey: 'post_id', constraints: false });
Post.hasMany(LikePost, { foreignKey: 'post_id', constraints: false });
