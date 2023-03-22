import { Router } from 'express'
import citiesController from '../controllers/cities.controller.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', citiesController.getCities)
router.post('/', authMiddleware, citiesController.addCity)
router.delete('/:id', authMiddleware, citiesController.delCity)

export default router
