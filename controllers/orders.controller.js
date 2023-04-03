import { ZodError } from 'zod'
import CustomError from '../customError.js'
import ordersService from '../services/orders.service.js'
import {
  addOrderSchema,
  delOrderSchema,
  editOrderSchema,
  getEndOrderDateSchema,
  getOrderByIdSchema
} from '../validation/ordersSchema.js'

export default {
  getOrders: async (req, res) => {
    try {
      const orders = await ordersService.getOrders()
      return res.status(200).json(orders)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
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
        console.log(error)
        return res.status(500).send(error)
      }
    }
  },

  getEndOrderDate: async (req, res) => {
    try {
      const body = req.body
      const { clockId, startTime } = getEndOrderDateSchema.parse(body)
      const endOrderDate = await ordersService.getEndOrderDate(startTime, clockId)
      return res.status(200).json(endOrderDate)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        console.log(error)
        return res.status(500).send(error)
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
        return res.status(500).send(error.errors)
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
        console.log(error)
        return res.status(500).send(error)
      }
    }
  },
  delOrder: async (req, res) => {
    try {
      const params = req.params
      const { id } = delOrderSchema.parse(params)
      await ordersService.delOrder(id)
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
        console.log(error)
        return res.status(500).send(error)
      }
    }
  }
}
