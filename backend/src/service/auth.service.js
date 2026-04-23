import userModel from '../model/user.model.js';
import refreshTokenModel from '../model/refreshToken.model.js';
import config from '../config/env.js';
import bcrypt from "bcrypt";
import z from "zod";
import jwt from "jsonwebtoken";
import logger from '../../utils/logger.js';


const userCreateParse = z.object({
    name: z.string().min(1).max(64),
    email: z.email(),
    password: z.string().min(8).max(128)
});
const userParse = z.object({
    email: z.email(),
    password: z.string().min(8).max(128)
});

/**
 * Generate Token
 * @param user
 * @returns {{access: *, refresh: *, expiresAt: Date}}
 */
function generateToken(user) {
    const payload = {
        id: user.id,
        role: user.role
    };

    const timeExpiration = parseInt(config.JWT_EXPIRES.match(/\d+/)[0]);

    const accessToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '15m', algorithm: 'HS256'});
    const refresh = jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES, algorithm: 'HS256'});
    return {
        access: accessToken,
        refresh: refresh,
        expiresAt: new Date(Date.now() + timeExpiration * 24 * 60 * 60 * 1000),
    };
}

/**
 *
 * @param user
 * @returns {Promise<*|string|undefined>}
 */
async function register(user){
    try {
        user = userCreateParse.parse(user)
        user.password = await bcrypt.hash(user.password, 12);

        const use = await userModel.createUser(user);
        const token = await generateToken(use);
        return {
            token: token.access,
            user: user
        };

    }catch(err){
        throw err;
    }
}

/**
 *
 * @param user
 * @returns {Promise<*|{accessToken: *, refreshToken: *}>}
 */
async function login(user){
    try {
        user = userParse.parse(user);

        const users = await userModel.findByEmail(user.email);

        if (!users || !await bcrypt.compare(user.password, users[0].password)) {
            throw new Error('Identifiants invalides');
        }

        const Token = generateToken(users[0]);
        logger.info('Avant createToken');
        await refreshTokenModel.createToken(users[0].id,Token.refresh, Token.expiresAt);
        logger.info('Apres createToken');
        return {
            accessToken: Token.access,
            refreshToken: Token.refresh,
        };
    }catch (err){
        logger.error('Error login');
        throw err;
    }
}

/**
 *
 * @param refreshToken
 * @returns {Promise<*>}
 */
async function logout(refreshToken){
    try{
        await refreshTokenModel.revokedToken(refreshToken);
    }catch(err){
        throw err;
    }
}

/**
 *
 * @param refreshToken
 * @returns {Promise<*|{accessToken: *, refreshToken: *}>}
 */
async function refresh(refreshToken){
    try{
        const storedToken = await refreshTokenModel.findByToken(refreshToken);
        if (!storedToken || storedToken.status === 'revoked') {
            throw new Error('Token invalide ou révoqué');
        }

        const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

        const Token = generateToken(decoded);

        await refreshTokenModel.revokedToken(refreshToken);
        await refreshTokenModel.createToken(decoded.id, Token.refresh, Token.expiresAt);

        return {
            accessToken: Token.access,
            refreshToken: Token.refresh,
        };
    }catch(err){
        throw err;
    }
}
export default {login, register, logout, refresh};