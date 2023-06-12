import { ZodError } from 'zod'
import CustomError from '../errors/customError.js'
import { ordersService } from '../services/service.layer.js'
import {
  addOrderSchema,
  deleteOrderSchema,
  editOrderSchema,
  getOrderEndTimeSchema,
  getOrderByIdSchema,
  completeOrderSchema,
  getOrdersForMasterByIdSchema,
  getOrdersForCustomerByIdSchema,
  getOrdersSchema,
  setFeedbackSchema,
  feedbackTokenSchema
} from '../validation/ordersSchema.js'

export default {
  getOrders: async (req, res) => {
    try {
      const { filters } = req.query
      const decodedFilters = JSON.parse(decodeURIComponent(filters))
      const { page, limit, sort, sortBy, filtersFields, timezoneOffset } =
        getOrdersSchema.parse(decodedFilters)
      const orders = await ordersService.getOrders(
        page,
        limit,
        sort,
        sortBy,
        filtersFields,
        timezoneOffset
      )
      return res.status(200).json(orders)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },
  getMinMaxOrdersDate: async (req, res) => {
    try {
      const minMaxOrdersDate = await ordersService.getMinMaxOrdersDate()
      return res.status(200).json(minMaxOrdersDate)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  },
  getMinMaxOrdersPrice: async (req, res) => {
    try {
      const minMaxOrdersPrice = await ordersService.getMinMaxOrdersPrice()
      return res.status(200).json(minMaxOrdersPrice)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  },
  addOrder: async (req, res) => {
    try {
      const body = req.body
      const {
        masterId,
        cityId,
        clockId,
        name,
        email,
        startTime,
        endTime,
        priceForHour,
        price,
        images
      } = addOrderSchema.parse(body)

      const newOrder = await ordersService.addOrder(
        masterId,
        cityId,
        clockId,
        name,
        email,
        startTime,
        endTime,
        priceForHour,
        price,
        images
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
      const {
        id,
        clockId,
        masterId,
        cityId,
        startTime,
        endTime,
        priceForHour,
        price,
        status,
        deletedImages
      } = editOrderSchema.parse({
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
        status,
        deletedImages
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
  setFeedback: async (req, res) => {
    try {
      const params = req.params
      const body = req.body
      const { feedbackToken, rating, comment } = setFeedbackSchema.parse({ ...body, ...params })
      const feedback = await ordersService.setFeedback(feedbackToken, rating, comment)
      return res.status(200).json(feedback)
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
  },
  getOrderByFeedbackToken: async (req, res) => {
    try {
      const params = req.params
      const { feedbackToken } = feedbackTokenSchema.parse(params)
      const order = await ordersService.getOrderByFeedbackToken(feedbackToken)
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
  }
}
