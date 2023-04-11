import { Router } from 'express'
import mastersController from '../controllers/masters.controller.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/getFreeMasters', mastersController.getFreeMasters)
router.get(
  '/freeMastersForOrder/:orderId',
  authMiddleWare,
  mastersController.getFreeMastersForCurrentOrder
)
router.get('/:id', mastersController.getMasterById)
router.get('/', authMiddleWare, mastersController.getMasters)
router.post('/', authMiddleWare, mastersController.addMaster)
router.put('/:id', authMiddleWare, mastersController.editMaster)
router.delete('/:id', authMiddleWare, mastersController.deleteMaster)

export default router
