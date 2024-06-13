import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

type DialectOptions = {
  ssl: boolean | {
    require: boolean;
    rejectUnauthorized: boolean;
  };
};

interface Config {
  [key: string]: {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string | undefined;
    dialect: Dialect;
    dialectOptions: DialectOptions;
  };
}

const config: Config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres' as Dialect,
    dialectOptions: {
      ssl: false,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres' as Dialect,
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres' as Dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

const environment = process.env.NODE_ENV || 'development';
const sequelizeConfig = config[environment];

// Temporarily disable the no-console rule for debugging purposes
// eslint-disable-next-line no-console
console.log('Using Sequelize configuration:', sequelizeConfig);

const sequelize = new Sequelize(
  sequelizeConfig.database || '',
  sequelizeConfig.username || '',
  sequelizeConfig.password || '',
  {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect,
    dialectOptions: sequelizeConfig.dialectOptions,
  }
);

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
