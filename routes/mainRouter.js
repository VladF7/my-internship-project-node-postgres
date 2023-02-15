const Router = require('express')
const router = new Router()
const citiesRouter = require('./citises.routes')
const mastersRouter = require('./masters.routes')
const userRouter = require('./user.routes')
const customersRouter = require('./customers.routes')
const ordersRouter = require('./orders.routes')

router.use('/cities', citiesRouter)
router.use('/masters', mastersRouter)
router.use('/user', userRouter)
router.use('/customers', customersRouter)
router.use('/orders', ordersRouter)

module.exports = router

