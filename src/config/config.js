require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  DbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT || 5432,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  url: process.env.URL_DB,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgUser: process.env.PGUSER,
  pgPassword: process.env.PGPASSWORD,
  jwtRefreshToken: process.env.REFRESH_TOKEN_SECRET,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailUser: process.env.USER_EMAIL,
  jwtRecovery: process.env.JWT_RECOVERY,
};

console.log(config);

module.exports = { config };
