const Router = require('express')
const router = new Router()
const citiesController = require('../controllers/cities.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', citiesController.getCities)
router.post('/', authMiddleware, citiesController.addCity)
router.delete('/:id', authMiddleware, citiesController.delCity)

module.exports = router
