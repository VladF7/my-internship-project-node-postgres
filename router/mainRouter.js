const Router = require('express')
const router = new Router()
const citiesRouter = require('./citises.router')
const mastersRouter = require('./masters.router')
const customersRouter = require('./customers.router')
const ordersRouter = require('./orders.router')
const authRouter = require('./auth.router')

router.use('/cities', citiesRouter)
router.use('/masters', mastersRouter)
router.use('/customers', customersRouter)
router.use('/orders', ordersRouter)
router.use('/auth', authRouter)

module.exports = router

