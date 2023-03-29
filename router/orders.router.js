import { Router } from 'express'
import ordersController from '../controllers/orders.controller.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/endTime', ordersController.getEndOrderDate)
router.post('/', ordersController.addOrder)
router.get('/', authMiddleWare, ordersController.getOrders)
router.get('/:id', authMiddleWare, ordersController.getOrderById)
router.put('/:id', authMiddleWare, ordersController.editOrder)
router.delete('/:id', authMiddleWare, ordersController.delOrder)

export default router
