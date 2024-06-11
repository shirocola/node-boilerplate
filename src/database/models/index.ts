import { Sequelize } from 'sequelize';
import User from './user';

const databaseUrl = process.env.DATABASE_URL!;
if (!databaseUrl) {
  throw new Error('Please provide a DATABASE_URL');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  ssl: process.env.NODE_ENV === 'production',
  dialectOptions: {
    ssl: {
      require: process.env.NODE_ENV === 'production',
      rejectUnauthorized: false
    }
  }
});

const models = {
  User: User
};

Object.values(models)
  .filter((model: any) => typeof model.associate === 'function')
  .forEach((model: any) => model.associate(models));

User.initialize(sequelize);

export { sequelize };
export default models;
