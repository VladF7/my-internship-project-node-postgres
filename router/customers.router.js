const Router = require('express')
const router = new Router()
const customersController = require('../controllers/customers.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, customersController.getCustomers)
router.get('/:id', authMiddleware, customersController.getCustomerById)
router.put('/:id', authMiddleware, customersController.editCustomer)
router.delete('/:id', authMiddleware, customersController.delCustomer)

module.exports = router
