import pkg from 'pg';
const { Pool } = pkg;
import { config } from '../config/config.js';

const options = {
  connectionString: config.urldb,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(options);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a Neon:', err);
  } else {
    console.log('CONEXIÓN EXITOSA A NEON:', res.rows[0]);
  }
});

export default pool;
