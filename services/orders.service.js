import { getFormDate } from '../date.js'
import sendMailService from '../services/mail.service.js'
import mastersModel from '../models/masters.model.js'
import ordersModel from '../models/orders.model.js'
import citiesModel from '../models/cities.model.js'
import clocksModel from '../models/clocks.model.js'
import customersModel from '../models/customers.model.js'
import CustomError from '../customError.js'

export default {
  getOrders: async () => {
    try {
      const orders = await ordersModel.getOrders()
      return orders.map((order) => {
        return {
          ...order.dataValues,
          startTime: getFormDate(order.startTime),
          endTime: getFormDate(order.endTime)
        }
      })
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  addOrder: async (masterId, cityId, clockId, name, email, startTime, endTime) => {
    try {
      const master = await mastersModel.getMasterById(masterId)
      if (!master) {
        throw new CustomError('MASTER_IS_NOT_EXIST', 404, `Master with id ${masterId} is not exist`)
      }
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError('CITY_IS_NOT_EXIST', 404, `City with id ${cityId} is not exist`)
      }
      const clock = await clocksModel.getClockById(clockId)
      if (!clock) {
        throw new CustomError('CLOCK_IS_NOT_EXIST', 404, `Clock with id ${clockId} is not exist`)
      }
      const isMasterAvailable = await mastersModel.isMasterAvailable(masterId, startTime, endTime)
      if (!isMasterAvailable) {
        throw new CustomError(
          'MASTER_IS_NOT_AVAILABEL',
          405,
          `Master with id ${masterId} is not available now`
        )
      }
      const customer = await customersModel.getCustomerByEmail(email)
      if (!customer) {
        const order = await ordersModel.createOrderAndCreateCustomer(
          masterId,
          cityId,
          clockId,
          name,
          email,
          startTime,
          endTime
        )
        await sendMailService.sendSuccessOrderMail(
          email,
          name,
          cityId,
          clockId,
          masterId,
          startTime,
          endTime
        )
        return order
      } else {
        const customerId = customer.id
        const order = await ordersModel.createOrderAndUpdateCustomer(
          masterId,
          cityId,
          clockId,
          customerId,
          name,
          startTime,
          endTime
        )
        await sendMailService.sendSuccessOrderMail(
          email,
          name,
          cityId,
          clockId,
          masterId,
          startTime,
          endTime
        )
        return order
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  getEndOrderDate: async (startTime, clockId) => {
    try {
      const clock = await clocksModel.getClockById(clockId)
      if (!clock) {
        throw new CustomError('CLOCK_IS_NOT_EXIST', 404, `Clock with id ${clockId} is not exist`)
      }
      const timeToFix = clock.timeToFix
      let endTime = new Date(startTime)
      endTime = endTime.setHours(endTime.getHours() + timeToFix)
      endTime = getFormDate(endTime)
      return endTime
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  getOrderById: async (orderId) => {
    try {
      const order = await ordersModel.getOrderById(orderId)
      if (!order) {
        throw new CustomError('ORDER_IS_NOT_EXIST', 404, `Order with id ${orderId} is not exist`)
      }
      return {
        ...order.dataValues,
        startTime: getFormDate(order.startTime),
        endTime: getFormDate(order.endTime)
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  editOrder: async (orderId, clockId, masterId, cityId, start, end) => {
    try {
      const order = await ordersModel.getOrderById(orderId)
      if (!order) {
        throw new CustomError('ORDER_IS_NOT_EXIST', 404, `Order with id ${orderId} is not exist`)
      }
      const clock = await clocksModel.getClockById(clockId)
      if (!clock) {
        throw new CustomError('CLOCK_IS_NOT_EXIST', 404, `Clock with id ${clockId} is not exist`)
      }
      const master = await mastersModel.getMasterById(masterId)
      if (!master) {
        throw new CustomError('MASTER_IS_NOT_EXIST', 404, `Master with id ${masterId} is not exist`)
      }
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError('CITY_IS_NOT_EXIST', 404, `City with id ${cityId} is not exist`)
      }
      const startTime = getFormDate(start)
      const endTime = getFormDate(end)
      const editedOrder = await ordersModel.editOrder(
        cityId,
        masterId,
        clockId,
        startTime,
        endTime,
        orderId
      )
      return editedOrder
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  delOrder: async (orderId) => {
    try {
      const order = await ordersModel.getOrderById(orderId)
      if (!order) {
        throw new CustomError('ORDER_IS_NOT_EXIST', 404, `Order with id ${orderId} is not exist`)
      }
      return await ordersModel.delOrder(orderId)
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
}
