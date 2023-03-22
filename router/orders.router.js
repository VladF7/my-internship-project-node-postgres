import { Router } from 'express'
import ordersController from '../controllers/orders.controller.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', ordersController.getEndOrderDate)
router.post('/:id', ordersController.addOrder)
router.get('/', authMiddleware, ordersController.getOrders)
router.get('/:id', authMiddleware, ordersController.getOrderById)
router.put('/:id', authMiddleware, ordersController.editOrder)
router.delete('/:id', authMiddleware, ordersController.delOrder)

export default router
