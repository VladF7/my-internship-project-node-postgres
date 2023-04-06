import { Router } from 'express'
import citiesController from '../controllers/cities.controller.js'
import { authMiddleWare } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', citiesController.getCities)
router.get('/:id', authMiddleWare, citiesController.getCityById)
router.put('/:id', authMiddleWare, citiesController.editCity)
router.post('/', authMiddleWare, citiesController.addCity)
router.delete('/:id', authMiddleWare, citiesController.deleteCity)

export default router
