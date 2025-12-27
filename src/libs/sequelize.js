const Sequelize = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index');
require('pg');
require('pg-hstore');

const URI = config.url;

if (!URI) {
  throw new Error(`Variable URI NO definida`);
}
console.log('CONEXION DB (sequelize)', URI);

//const USER = encodeURIComponent(config.DbUser);
//const PASSWORD = encodeURIComponent(config.dbPassword);

const sequelize = new Sequelize(URI, {
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

setupModels(sequelize);

module.exports = sequelize;
