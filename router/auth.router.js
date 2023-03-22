import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router()

router.post('/login', authController.login)
router.get('/auth', authMiddleware, authController.auth)

export default router