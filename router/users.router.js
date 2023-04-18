import { Router } from 'express'
import { usersController } from '../controllers/controller.layer'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/login', usersController.login)
router.post('/master/registration', usersController.masterRegistration)
router.post('/customer/registration', usersController.customerRegistration)
router.post(
  '/admin/master/registration',
  authMiddleWare,
  usersController.masterRegistrationFromAdminPage
)
router.post(
  '/admin/customer/registration',
  authMiddleWare,
  usersController.customerRegistrationFromAdminPage
)
router.get('/confirmEmail/:activationLink', usersController.confirmEmail)
router.get('/auth', authMiddleWare, usersController.auth)

export default router