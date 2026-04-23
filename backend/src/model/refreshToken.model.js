import pool from '../config/database.js';
import logger from '../../utils/logger.js';

async function createToken(userId, token, expiresAt){
    try {
        const query = 'insert into refresh_token ("userId", "token", "expiresAt") values ($1,$2,$3) returning *';

        const response = await pool.query(query, [userId, token, expiresAt]);

        if (response.rowCount !== 1) {
            logger.error('Error creating refresh token');

            return 'Error creating refresh token';
        }

    }catch(err){
        return err;
    }
}

async function findByToken(token){
    try{
        const query = 'select * from refresh_token where "token" = $1';

        const response = await pool.query(query, [token]);
        if (!response.rows) {
            throw new Error('Error finding refresh token');
        }

        return response.rows;
    }catch (err){
        throw new Error(err.message);
    }
}

async function revokedToken(token){
    try {
        const query = 'update refresh_token set status = \'revoked\' where "token" = $1';

        const response = await pool.query(query, [token]);
        if (response.rowCount === 0){
            return 'Error finding refresh token';
        }

        return 'Successfully revoked';
    }catch(err){
        return err.message;
    }
}

async function revokeAllUserTokens(userId){
    try{
        const query = 'update refresh_token set status = \'revoked\' where "userId" = $1';

        const response = await pool.query(query, [userId]);
        if (response.rowCount === 0){
            return 'Error finding userId';
        }
        return 'Successfully revoked';
    }catch (err){
        return err.message;
    }
}

export default {createToken, revokeAllUserTokens, findByToken, revokedToken};