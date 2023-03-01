const Router = require('express')
const router = new Router()
const customersController = require('../controllers/customers.controller')

router.get('/', customersController.getCustomers)
router.get('/:id',customersController.getCustomerById)
router.put('/:id',customersController.editCustomer)
router.delete('/:id', customersController.delCustomer)

module.exports = router
