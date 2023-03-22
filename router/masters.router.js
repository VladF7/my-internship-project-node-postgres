import { Router } from 'express'
import mastersController from '../controllers/masters.controller.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.post('/getMastersList', mastersController.getFreeMasters)
router.get('/', authMiddleware, mastersController.getMasters)
router.get('/:id', authMiddleware, mastersController.getMasterById)
router.post('/',authMiddleware, mastersController.addMaster)
router.put('/:id', authMiddleware, mastersController.editMaster)
router.delete('/:id', authMiddleware, mastersController.delMaster)


export default router
