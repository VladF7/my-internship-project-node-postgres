/* eslint-disable no-useless-catch */
import { getFormatDate } from '../date.js'
import sendMailService from '../services/mail.service.js'
import mastersModel from '../models/masters.model.js'
import ordersModel from '../models/orders.model.js'
import citiesModel from '../models/cities.model.js'
import clocksModel from '../models/clocks.model.js'
import customersModel from '../models/customers.model.js'
import CustomError from '../errors/customError.js'
import {
  CITY_IS_NOT_EXIST,
  CLOCK_IS_NOT_EXIST,
  INCORRECT_PRICE,
  MASTER_IS_NOT_AVAILABEL,
  MASTER_IS_NOT_EXIST,
  ORDER_IS_NOT_EXIST,
  PRICE_FOR_HOUR_IS_NOT_EXIS,
  STATUS_IS_NOT_EXIST
} from '../errors/types.js'
import statusesModel from '../models/statuses.model.js'
import { Statuses } from '../db/models/Order.js'

export default {
  getOrders: async () => {
    try {
      const orders = await ordersModel.getOrders()
      return orders.map((order) => {
        return {
          ...order.dataValues,
          startTime: getFormatDate(order.startTime),
          endTime: getFormatDate(order.endTime)
        }
      })
    } catch (error) {
      throw error
    }
  },
  addOrder: async (
    masterId,
    cityId,
    clockId,
    name,
    email,
    startTime,
    endTime,
    priceForHour,
    price
  ) => {
    try {
      const master = await mastersModel.getMasterById(masterId)
      if (!master) {
        throw new CustomError(MASTER_IS_NOT_EXIST, 400, `Master with id ${masterId} is not exist`)
      }
      const isMasterAvailable = await mastersModel.isMasterAvailable(masterId, startTime, endTime)
      if (!isMasterAvailable) {
        throw new CustomError(
          MASTER_IS_NOT_AVAILABEL,
          400,
          `Master with id ${masterId} is not available now`
        )
      }
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `City with id ${cityId} is not exist`)
      }
      const correctPriceForHour = await citiesModel.getCorrectPriceForHour(cityId)
      if (priceForHour !== correctPriceForHour) {
        throw new CustomError(
          PRICE_FOR_HOUR_IS_NOT_EXIS,
          400,
          `Price for hour ${priceForHour} for city with id ${cityId} is not exist`
        )
      }
      const clock = await clocksModel.getClockById(clockId)
      if (!clock) {
        throw new CustomError(CLOCK_IS_NOT_EXIST, 400, `Clock with id ${clockId} is not exist`)
      }
      const correctPrice = await citiesModel.getCorrectPrice(cityId, clockId)
      if (price !== correctPrice) {
        throw new CustomError(INCORRECT_PRICE, 400, `Price ${price} is wrong`)
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
          endTime,
          price
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
          endTime,
          price
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
      throw error
    }
  },
  getOrderEndTime: async (startTime, clockId) => {
    try {
      const clock = await clocksModel.getClockById(clockId)
      if (!clock) {
        throw new CustomError(CLOCK_IS_NOT_EXIST, 400, `Clock with id ${clockId} is not exist`)
      }
      const timeToFix = clock.timeToFix
      let endTime = new Date(startTime)
      endTime = endTime.setHours(endTime.getHours() + timeToFix)
      endTime = getFormatDate(endTime)
      return endTime
    } catch (error) {
      throw error
    }
  },
  getOrderById: async (id) => {
    try {
      const order = await ordersModel.getOrderById(id)
      if (!order) {
        throw new CustomError(ORDER_IS_NOT_EXIST, 404, `Order with id ${id} is not exist`)
      }
      return {
        ...order.dataValues,
        startTime: getFormatDate(order.startTime),
        endTime: getFormatDate(order.endTime)
      }
    } catch (error) {
      throw error
    }
  },
  editOrder: async (id, clockId, masterId, cityId, start, end, priceForHour, price, status) => {
    try {
      const order = await ordersModel.getOrderById(id)
      if (!order) {
        throw new CustomError(ORDER_IS_NOT_EXIST, 400, `Order with id ${id} is not exist`)
      }
      const clock = await clocksModel.getClockById(clockId)
      if (!clock) {
        throw new CustomError(CLOCK_IS_NOT_EXIST, 400, `Clock with id ${clockId} is not exist`)
      }
      const master = await mastersModel.getMasterById(masterId)
      if (!master) {
        throw new CustomError(MASTER_IS_NOT_EXIST, 400, `Master with id ${masterId} is not exist`)
      }
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `City with id ${cityId} is not exist`)
      }
      const correctPriceForHour = await citiesModel.getCorrectPriceForHour(cityId)
      if (priceForHour !== correctPriceForHour) {
        throw new CustomError(
          PRICE_FOR_HOUR_IS_NOT_EXIS,
          400,
          `Price for hour ${priceForHour} for city with id ${cityId} is not exist`
        )
      }
      const correctPrice = await citiesModel.getCorrectPrice(cityId, clockId)
      if (price !== correctPrice) {
        throw new CustomError(INCORRECT_PRICE, 400, `Price ${price} is wrong`)
      }
      const correctStatus = await statusesModel.checkCorrectOrderStatus(status)
      if (!correctStatus) {
        throw new CustomError(STATUS_IS_NOT_EXIST, 400, `Status ${status} for order is not exist`)
      }

      const startTime = getFormatDate(start)
      const endTime = getFormatDate(end)

      const editedOrder = await ordersModel.editOrder(
        id,
        cityId,
        masterId,
        clockId,
        startTime,
        endTime,
        price,
        status
      )
      return editedOrder
    } catch (error) {
      throw error
    }
  },
  deleteOrder: async (id) => {
    try {
      const order = await ordersModel.getOrderById(id)
      if (!order) {
        throw new CustomError(ORDER_IS_NOT_EXIST, 400, `Order with id ${id} is not exist`)
      }
      const deletedOrder = await ordersModel.deleteOrder(id)
      return deletedOrder
    } catch (error) {
      throw error
    }
  },
  changeStatus: async (id) => {
    try {
      const order = await ordersModel.getOrderById(id)
      if (!order) {
        throw new CustomError(ORDER_IS_NOT_EXIST, 400, `Order with id ${id} is not exist`)
      }
      order.status = Statuses.Completed
      await order.save()
      return order.status
    } catch (error) {
      throw error
    }
  },
  setRating: async (id, rating) => {
    try {
      const order = await ordersModel.getOrderById(id)
      if (!order) {
        throw new CustomError(ORDER_IS_NOT_EXIST, 400, `Order with id ${id} is not exist`)
      }
      order.rating = rating
      await order.save()
      return order.rating
    } catch (error) {
      throw error
    }
  }
}
