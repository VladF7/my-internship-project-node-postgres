import { Router } from 'express'
import authController from '../controllers/auth.controller.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/login', authController.login)
router.get('/auth', authMiddleWare, authController.auth)

export default router
