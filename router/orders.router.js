const Router = require('express')
const router = new Router()
const ordersController = require('../controllers/orders.controller')

router.post('/', ordersController.getEndOrderDate)
router.post('/:id', ordersController.addOrder)
router.get('/', ordersController.getOrders)
router.get('/:id',ordersController.getOrderById)
router.put('/:id',ordersController.editOrder)
router.delete('/:id', ordersController.delOrder)

module.exports = router
