import { Router } from 'express'
import { customersController } from '../controllers/controller.layer.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', authMiddleWare, customersController.getCustomers)
router.get('/:id', authMiddleWare, customersController.getCustomerById)
router.get('/resetPassword/:id', authMiddleWare, customersController.resetPassword)
router.put('/:id', authMiddleWare, customersController.editCustomer)
router.delete('/:id', authMiddleWare, customersController.deleteCustomer)

export default router
