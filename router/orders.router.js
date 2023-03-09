const Router = require('express')
const router = new Router()
const ordersController = require('../controllers/orders.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', ordersController.getEndOrderDate)
router.post('/:id', ordersController.addOrder)
router.get('/', authMiddleware, ordersController.getOrders)
router.get('/:id', authMiddleware, ordersController.getOrderById)
router.put('/:id', authMiddleware, ordersController.editOrder)
router.delete('/:id', authMiddleware, ordersController.delOrder)

module.exports = router
