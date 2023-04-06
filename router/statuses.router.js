import { Router } from 'express'
import statusesController from '../controllers/statuses.controller.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', authMiddleWare, statusesController.getStatuses)

export default router
