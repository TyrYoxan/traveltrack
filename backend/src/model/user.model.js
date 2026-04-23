import pool from '../config/database.js';
import logger from '../../utils/logger.js';
import config from '../config/env.js';

async function createUser(user) {
  try {
    const query = 'insert into users (name, email, password) values ($1,$2,$3) returning *';

    const response = await pool.query(query, [user.name, user.email, user.password]);

    if (response.rowCount !== 1) {
      return 'Invalid email or password';
    }

    return response.rows;
  } catch (err) {
    return err.message;
  }
}

async function findByEmail(email) {
  logger.info('Connexion', config.DATABASE_URL);
  try {
    const query = 'select id, name, email, password, role, status from users where email=$1';
    const response = await pool.query(query, [email]);

    return response.rows;
  } catch (err) {
    return err;
  }
}

async function findById(id) {
  try {

    const query = 'select * from users where id=$1';
    const response = await pool.query(query, [id]);

    return response.rows;
  } catch (err) {
    return err.message;
  }
}

export default {createUser, findByEmail, findById};