import { Router } from 'express'
import citiesController from '../controllers/cities.controller.js'
import { checkAuthAndRole } from '../middleware/checkAuthAndRoleMiddleware.js'
import { Roles } from '../db/models/User.js'

const router = Router()

router.get('/', citiesController.getCities)
router.get('/:id', citiesController.getCityById)
router.put('/:id', checkAuthAndRole(Roles.Admin), citiesController.editCity)
router.post('/', checkAuthAndRole(Roles.Admin), citiesController.addCity)
router.delete('/:id', checkAuthAndRole(Roles.Admin), citiesController.deleteCity)

export default router
