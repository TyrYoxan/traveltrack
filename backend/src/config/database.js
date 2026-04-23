import { Pool } from 'pg';
import config from '../config/env.js';
import logger from '../../utils/logger.js';

const pool = new Pool({
  connectionString: config.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  //connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
});

pool.on('connect', () => {
  logger.info('New client connected to pool');
});

export default pool;