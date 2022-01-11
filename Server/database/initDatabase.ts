import sequelize from './database.state';
import './models/index';

const initDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Подключение к БД установлено');
  } catch (e) {
    console.log('Ошибка подключения', e);
  }
};

export default initDatabase;
