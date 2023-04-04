import { ZodError } from 'zod'
import CustomError from '../errors/customError.js'
import ordersService from '../services/orders.service.js'
import {
  addOrderSchema,
  deleteOrderSchema,
  editOrderSchema,
  getOrderEndTimeSchema,
  getOrderByIdSchema
} from '../validation/ordersSchema.js'

export default {
  getOrders: async (req, res) => {
    try {
      const orders = await ordersService.getOrders()
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  },
  addOrder: async (req, res) => {
    try {
      const body = req.body
      const { masterId, cityId, clockId, name, email, startTime, endTime } =
        addOrderSchema.parse(body)
      const newOrder = await ordersService.addOrder(
        masterId,
        cityId,
        clockId,
        name,
        email,
        startTime,
        endTime
      )
      return res.status(201).json(newOrder)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },

  getOrderEndTime: async (req, res) => {
    try {
      const query = req.query
      const { clockId, startTime } = getOrderEndTimeSchema.parse(query)
      const orderEndTime = await ordersService.getOrderEndTime(startTime, clockId)
      return res.status(200).json(orderEndTime)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },
  getOrderById: async (req, res) => {
    try {
      const params = req.params
      const { id } = getOrderByIdSchema.parse(params)
      const order = await ordersService.getOrderById(id)
      return res.status(200).json(order)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },
  editOrder: async (req, res) => {
    try {
      const body = req.body
      const params = req.params
      const { id, clockId, masterId, cityId, startTime, endTime } = editOrderSchema.parse({
        ...body,
        ...params
      })
      const editedOrder = await ordersService.editOrder(
        id,
        clockId,
        masterId,
        cityId,
        startTime,
        endTime
      )
      return res.status(200).json(editedOrder)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const params = req.params
      const { id } = deleteOrderSchema.parse(params)
      await ordersService.deleteOrder(id)
      return res.status(200).json(id)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  }
}
