import { Router } from 'express'
import mastersController from '../controllers/masters.controller.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/getMastersList', mastersController.getFreeMasters)
router.get('/', authMiddleWare, mastersController.getMasters)
router.get('/:id', authMiddleWare, mastersController.getMasterById)
router.post('/', authMiddleWare, mastersController.addMaster)
router.put('/:id', authMiddleWare, mastersController.editMaster)
router.delete('/:id', authMiddleWare, mastersController.delMaster)

export default router
