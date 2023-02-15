const Router = require('express')
const router = new Router()
const userController = require('../controllers/user.controller')

router.post('/getMastersList', userController.getFreeMasters)
router.post('/:id', userController.addOrder)


module.exports = router
