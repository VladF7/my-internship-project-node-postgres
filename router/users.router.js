import { Router } from 'express'
import usersController from '../controllers/users.controller.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'
import { checkAuthAndRole } from '../middleware/checkAuthAndRoleMiddleware.js'
import { Roles } from '../db/models/User.js'

const router = Router()

router.post('/login', usersController.login)
router.post('/master/registration', usersController.masterRegistration)
router.post('/customer/registration', usersController.customerRegistration)
router.post(
  '/admin/master/registration',
  checkAuthAndRole(Roles.Admin),
  usersController.masterRegistrationFromAdminPage
)
router.post(
  '/admin/customer/registration',
  checkAuthAndRole(Roles.Admin),
  usersController.customerRegistrationFromAdminPage
)
router.get('/confirmEmail/:activationLink', usersController.confirmEmail)
router.get('/auth', authMiddleWare, usersController.auth)
router.get(
  '/master/:id',
  checkAuthAndRole(Roles.Master),
  usersController.getOrdersForMasterByUserId
)
router.get(
  '/customer/:id',
  checkAuthAndRole(Roles.Customer),
  usersController.getOrdersForCustomerByUserId
)
router.get('/users', usersController.getUserByEmail)
router.post('/createUser', usersController.createUserCustomer)

export default router
