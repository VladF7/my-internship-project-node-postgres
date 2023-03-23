import { Router } from 'express'
import citiesRouter from './cities.router.js'
import mastersRouter from './masters.router.js'
import ordersRouter from './orders.router.js'
import customersRouter from './customers.router.js'
import authRouter from './auth.router.js'

const router = Router()

router.use('/cities', citiesRouter)
router.use('/masters', mastersRouter)
router.use('/customers', customersRouter)
router.use('/orders', ordersRouter)
router.use('/auth', authRouter)

export default router
