const { config } = require('../config/config');

const USER = encodeURIComponent(config.DbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = config.url;

if (!URI) {
  console.error(`Variable URI NO definida`);
}
console.log('CONEXION DB (config)', URI);

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
