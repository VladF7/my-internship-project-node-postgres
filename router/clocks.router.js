import { Router } from 'express'
import clocksController from '../controllers/clocks.contorller.js'

const router = Router()

router.get('/', clocksController.getClocks)
router.get('/:id', clocksController.getClockById)

export default router
