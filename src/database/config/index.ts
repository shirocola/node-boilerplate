import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  ssl: process.env.NODE_ENV === 'production',
  dialectOptions: {
    ssl: {
      require: process.env.NODE_ENV === 'production',
      rejectUnauthorized: false
    }
  }
});

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
