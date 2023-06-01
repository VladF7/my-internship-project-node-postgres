import { Router } from 'express'
import citiesRouter from './cities.router.js'
import mastersRouter from './masters.router.js'
import ordersRouter from './orders.router.js'
import customersRouter from './customers.router.js'
import usersRouter from './users.router.js'
import clocksRouter from './clocks.router.js'
import statusesRouter from './statuses.router.js'
import paypalRouter from './paypal.router.js'

const router = Router()

router.use('/statuses', statusesRouter)
router.use('/clocks', clocksRouter)
router.use('/cities', citiesRouter)
router.use('/masters', mastersRouter)
router.use('/customers', customersRouter)
router.use('/orders', ordersRouter)
router.use('/paypal', paypalRouter)
router.use('/', usersRouter)

export default router
