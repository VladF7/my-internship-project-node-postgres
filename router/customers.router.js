import { Router } from 'express'
import customersController from '../controllers/customers.controller.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', authMiddleware, customersController.getCustomers)
router.get('/:id', authMiddleware, customersController.getCustomerById)
router.put('/:id', authMiddleware, customersController.editCustomer)
router.delete('/:id', authMiddleware, customersController.delCustomer)

export default router
