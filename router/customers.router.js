import { Router } from 'express'

import { customersController } from '../controllers/controller.layer.js'
import { checkAuthAndRole } from '../middleware/checkAuthAndRoleMiddleware.js'
import { Roles } from '../db/models/User.js'

const router = Router()

router.get('/', checkAuthAndRole(Roles.Admin), customersController.getCustomers)
router.get('/:id', checkAuthAndRole(Roles.Admin), customersController.getCustomerById)
router.get('/resetPassword/:id', checkAuthAndRole(Roles.Admin), customersController.resetPassword)
router.put('/:id', checkAuthAndRole(Roles.Admin), customersController.editCustomer)
router.delete('/:id', checkAuthAndRole(Roles.Admin), customersController.deleteCustomer)

export default router
