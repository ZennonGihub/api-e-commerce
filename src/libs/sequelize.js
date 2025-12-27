import { Sequelize } from 'sequelize';
import { config } from '../config/config.js';
import setupModels from '../db/models/index.model.js';

import 'pg';
import 'pg-hstore';

const URI = config.url;

if (!URI) {
  throw new Error(`Variable URI NO definida`);
}

export const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

export const models = sequelize.models;
setupModels(sequelize);
