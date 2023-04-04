import { Router } from 'express'
import citiesController from '../controllers/cities.controller.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', citiesController.getCities)
router.post('/', authMiddleWare, citiesController.addCity)
router.delete('/:id', authMiddleWare, citiesController.deleteCity)

export default router
