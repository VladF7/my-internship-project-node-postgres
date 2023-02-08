const Router = require('express')
const router = new Router()
const citiesController = require('../controllers/cities.controller')

router.get('/', citiesController.getCities)
router.post('/', citiesController.addCity)
router.delete('/:id', citiesController.delCity)

module.exports = router
