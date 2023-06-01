import { Router } from 'express'
import { paypalController } from '../controllers/controller.layer.js'

const router = Router()

router.post('/webhook', paypalController.webhookNotifications)

export default router
