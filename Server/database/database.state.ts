import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('SocialNetwork', 'postgres', 'Admin', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
