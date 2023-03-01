const Router = require('express')
const router = new Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', authController.login)
router.get('/auth', authMiddleware, authController.auth)

module.exports = router