import { Router } from 'express'
import statusesController from '../controllers/statuses.controller.js'
import { checkAuthAndRole } from '../middleware/checkAuthAndRoleMiddleware.js'
import { Roles } from '../db/models/User.js'

const router = Router()

router.get('/', checkAuthAndRole(Roles.Admin), statusesController.getStatuses)

export default router
