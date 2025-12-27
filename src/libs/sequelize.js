import { Sequelize } from 'sequelize';
import { config } from '../config/config.js';
import { setupModels } from '../db/models/index.js';

import 'pg';
import 'pg-hstore';

const URI = config.url;

if (!URI) {
  throw new Error(`Variable URI NO definida`);
}
console.log('CONEXION DB (sequelize)', URI);

//const USER = encodeURIComponent(config.DbUser);
//const PASSWORD = encodeURIComponent(config.dbPassword);

export const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
  schema: 'public',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const models = sequelize.models;
setupModels(sequelize);
