import { Router } from 'express'
import ordersController from '../controllers/orders.controller.js'
import { checkAuthAndRole } from '../middleware/checkAuthAndRoleMiddleware.js'
import { Roles } from '../db/models/User.js'

const router = Router()

router.get('/orderEndTime', ordersController.getOrderEndTime)
router.post('/', ordersController.addOrder)
router.get('/', checkAuthAndRole(Roles.Admin), ordersController.getOrders)
router.get('/:id', checkAuthAndRole(Roles.Admin), ordersController.getOrderById)
router.put('/:id', checkAuthAndRole(Roles.Admin), ordersController.editOrder)
router.delete('/:id', checkAuthAndRole(Roles.Admin), ordersController.deleteOrder)
router.put('/changeStatus/:id', checkAuthAndRole(Roles.Master), ordersController.changeStatus)
router.put('/setRating/:id', checkAuthAndRole(Roles.Customer), ordersController.setRating)

export default router
