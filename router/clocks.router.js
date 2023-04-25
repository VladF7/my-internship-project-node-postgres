import { Router } from 'express'
import { clocksController } from '../controllers/controller.layer.js'

const router = Router()

router.get('/', clocksController.getClocks)
router.get('/:id', clocksController.getClockById)

export default router
