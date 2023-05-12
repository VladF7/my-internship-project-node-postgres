import { ZodError } from 'zod'
import CustomError from '../errors/customError.js'
import { ordersService } from '../services/service.layer.js'
import {
  addOrderSchema,
  deleteOrderSchema,
  editOrderSchema,
  getOrderEndTimeSchema,
  getOrderByIdSchema,
  setRatingSchema,
  completeOrderSchema,
  getOrdersForMasterByIdSchema,
  getOrdersForCustomerByIdSchema
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
      const { masterId, cityId, clockId, name, email, startTime, endTime, priceForHour, price } =
        addOrderSchema.parse(body)
      const newOrder = await ordersService.addOrder(
        masterId,
        cityId,
        clockId,
        name,
        email,
        startTime,
        endTime,
        priceForHour,
        price
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
      const { id, clockId, masterId, cityId, startTime, endTime, priceForHour, price, status } =
        editOrderSchema.parse({
          ...body,
          ...params
        })
      const editedOrder = await ordersService.editOrder(
        id,
        clockId,
        masterId,
        cityId,
        startTime,
        endTime,
        priceForHour,
        price,
        status
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
      const deletedOrder = await ordersService.deleteOrder(id)
      return res.status(200).json(deletedOrder)
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
  completeOrder: async (req, res) => {
    try {
      const params = req.params
      const { id } = completeOrderSchema.parse(params)
      const changedStatus = await ordersService.completeOrder(id)
      return res.status(200).json(changedStatus)
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
  setRating: async (req, res) => {
    try {
      const params = req.params
      const body = req.body
      const { id, rating } = setRatingSchema.parse({ ...body, ...params })
      const newRating = await ordersService.setRating(id, rating)
      return res.status(200).json(newRating)
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
  getOrdersForMasterById: async (req, res) => {
    try {
      const params = req.params
      const { masterId } = getOrdersForMasterByIdSchema.parse(params)
      const orders = await ordersService.getOrdersForMasterById(masterId)
      return res.status(200).json(orders)
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
  getOrdersForCustomerById: async (req, res) => {
    try {
      const params = req.params
      const { customerId } = getOrdersForCustomerByIdSchema.parse(params)
      const orders = await ordersService.getOrdersForCustomerById(customerId)
      return res.status(200).json(orders)
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
