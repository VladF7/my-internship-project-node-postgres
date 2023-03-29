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
      return res.status(400).json(error)
    }
  },
  addOrder: async (req, res) => {
    try {
      const body = req.body
      const { masterId, name, email, size, city, startTime, endTime } = addOrderSchema.parse(body)
      const newOrder = await ordersService.addOrder(
        masterId,
        name,
        email,
        size,
        city,
        startTime,
        endTime
      )
      return res.status(200).json(newOrder)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },

  getEndOrderDate: async (req, res) => {
    try {
      const body = req.body
      const { size, startTime } = getEndOrderDateSchema.parse(body)
      const endOrderDate = await ordersService.getEndOrderDate(startTime, size)
      return res.status(200).json(endOrderDate)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  getOrderById: async (req, res) => {
    try {
      const params = req.params
      const { id } = getOrderByIdSchema.parse(params)
      const order = await ordersService.getOrderById(id)
      return res.status(200).json(order)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  editOrder: async (req, res) => {
    try {
      const body = req.body
      const params = req.params
      const { id, size, master, city, start, end } = editOrderSchema.parse({ ...body, ...params })
      const editedOrder = await ordersService.editOrder(id, size, master, city, start, end)
      return res.status(200).json(editedOrder)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  delOrder: async (req, res) => {
    try {
      const params = req.params
      const { id } = delOrderSchema.parse(params)
      await ordersService.delOrder(id)
      return res.json(id)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  }
}
