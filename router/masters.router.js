import { Router } from 'express'

import { mastersController } from '../controllers/controller.layer.js'
import { checkAuthAndRole } from '../middleware/checkAuthAndRoleMiddleware.js'
import { Roles } from '../db/models/User.js'

const router = Router()

router.get('/getFreeMasters', mastersController.getFreeMasters)
router.get(
  '/freeMastersForOrder/:orderId',
  checkAuthAndRole(Roles.Admin),
  mastersController.getFreeMastersForCurrentOrder
)
router.get('/all', checkAuthAndRole(Roles.Admin), mastersController.getMastersAll)
router.get('/activate/:id', checkAuthAndRole(Roles.Admin), mastersController.activate)
router.get('/:id', mastersController.getMasterById)
router.get('/', checkAuthAndRole(Roles.Admin), mastersController.getMasters)
router.get('/resetPassword/:id', checkAuthAndRole(Roles.Admin), mastersController.resetPassword)
router.put('/:id', checkAuthAndRole(Roles.Admin), mastersController.editMaster)
router.delete('/:id', checkAuthAndRole(Roles.Admin), mastersController.deleteMaster)

export default router
