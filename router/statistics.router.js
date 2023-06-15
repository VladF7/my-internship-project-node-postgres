import { Router } from 'express'
import { checkAuthAndRole } from '../middleware/checkAuthAndRoleMiddleware.js'
import { Roles } from '../db/models/User.js'
import { statisticsController } from '../controllers/controller.layer.js'

const router = Router()

router.get(
  '/orders/numbersByDate',
  checkAuthAndRole(Roles.Admin),
  statisticsController.getNumberOfOrdersByDate
)
router.get(
  '/orders/numbersByCity',
  checkAuthAndRole(Roles.Admin),
  statisticsController.getNumberOfOrdersByCity
)
router.get(
  '/orders/numbersByMasters',
  checkAuthAndRole(Roles.Admin),
  statisticsController.getNumberOfOrdersByMasters
)
router.get('/masters', checkAuthAndRole(Roles.Admin), statisticsController.getMasterStatistics)

export default router
