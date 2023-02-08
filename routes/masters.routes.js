const Router = require('express')
const router = new Router()
const mastersController = require('../controllers/masters.controller')

router.get('/', mastersController.getMasters)
router.get('/:id',mastersController.getMasterById)
router.post('/', mastersController.addMaster)
router.put('/:id',mastersController.editMaster)
router.delete('/:id', mastersController.delMaster)

module.exports = router
