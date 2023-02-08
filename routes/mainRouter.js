const Router = require('express')
const router = new Router()
const citiesRouter = require('./citises.routes')
const mastersRouter = require('./masters.routes')

router.use('/cities', citiesRouter)
router.use('/masters', mastersRouter)

module.exports = router

