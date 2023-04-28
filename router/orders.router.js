import { Router } from 'express'
import { ordersController } from '../controllers/controller.layer.js'
import { checkAuthAndRole } from '../middleware/checkAuthAndRoleMiddleware.js'
import { Roles } from '../db/models/User.js'
import { checkUserId } from '../middleware/checkUserIdMiddleware.js'

const router = Router()

router.get('/orderEndTime', ordersController.getOrderEndTime)
router.post('/', ordersController.addOrder)
router.get('/', checkAuthAndRole(Roles.Admin), ordersController.getOrders)
router.get('/:id', checkAuthAndRole(Roles.Admin), ordersController.getOrderById)
router.put('/:id', checkAuthAndRole(Roles.Admin), ordersController.editOrder)
router.delete('/:id', checkAuthAndRole(Roles.Admin), ordersController.deleteOrder)
router.put(
  '/completeOrder/:id',
  checkAuthAndRole(Roles.Master),
  checkUserId(),
  ordersController.completeOrder
)
router.put(
  '/setRating/:id',
  checkAuthAndRole(Roles.Customer),
  checkUserId(),
  ordersController.setRating
)
router.get(
  '/master/:masterId',
  checkAuthAndRole(Roles.Master),
  checkUserId(),
  ordersController.getOrdersForMasterById
)
router.get(
  '/customer/:customerId',
  checkAuthAndRole(Roles.Customer),
  checkUserId(),
  ordersController.getOrdersForCustomerById
)

export default router
