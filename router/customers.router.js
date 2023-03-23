import { Router } from 'express'
import customersController from '../controllers/customers.controller.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', authMiddleWare, customersController.getCustomers)
router.get('/:id', authMiddleWare, customersController.getCustomerById)
router.put('/:id', authMiddleWare, customersController.editCustomer)
router.delete('/:id', authMiddleWare, customersController.delCustomer)

export default router
