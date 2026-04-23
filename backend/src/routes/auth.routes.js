import express from 'express';

const router = express.Router();

import authController from '../controllers/auth.controller.js';


router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout)
router.post('/auth/signup', authController.register)

export default router;