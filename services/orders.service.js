/* eslint-disable no-useless-catch */
import { getFormatDate } from '../date.js'
import CustomError from '../errors/customError.js'
import {
  mastersModel,
  ordersModel,
  citiesModel,
  clocksModel,
  customersModel,
  statusesModel,
  usersModel
} from '../models/model.layer.js'
import sendMailService from '../services/mail.service.js'

import {
  CITY_IS_NOT_EXIST,
  CLOCK_IS_NOT_EXIST,
  CUSTOMER_IS_NOT_EXIST,
  INCORRECT_PRICE,
  MASTER_IS_NOT_AVAILABEL,
  MASTER_IS_NOT_EXIST,
  ORDER_IS_NOT_EXIST,
  PRICE_FOR_HOUR_IS_NOT_EXIS,
  STATUS_IS_NOT_EXIST,
  WRONG_USER_ROLE
} from '../errors/types.js'
import { Statuses } from '../db/models/Order.js'
import { Roles } from '../db/models/User.js'

export default {
  getOrders: async (page, limit, sort, sortBy, filtersFields, timezoneOffset) => {
    try {
      const orders = await ordersModel.getOrders(
        page,
        limit,
        sort,
        sortBy,
        filtersFields,
        timezoneOffset
      )
      orders.rows = orders.rows.map((order) => {
        return {
          ...order.dataValues,
          startTime: getFormatDate(order.startTime),
          endTime: getFormatDate(order.endTime)
        }
      })
      return orders
    } catch (error) {
      throw error
    }
  },
  getMinMaxOrdersDate: async () => {
    try {
      const minMaxOrdersDate = await ordersModel.getMinMaxOrdersDate()
      return minMaxOrdersDate.map((orderDate) => getFormatDate(orderDate))
    } catch (error) {
      throw error
    }
  },

  getMinMaxOrdersPrice: async () => {
    try {
      const minMaxOrdersPrice = await ordersModel.getMinMaxOrdersPrice()
      return minMaxOrdersPrice
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
      const user = await usersModel.getUserByEmail(email)
      const userRole = user ? user.role : Roles.Customer
      if (userRole === Roles.Master) {
        throw new CustomError(
          WRONG_USER_ROLE,
          400,
          `User with role ${Roles.Master} can't create orders`
        )
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
      if (!deletedOrder) {
        throw new Error()
      }
      return id
    } catch (error) {
      throw error
    }
  },
  completeOrder: async (id) => {
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
  },
  getOrdersForMasterById: async (id) => {
    try {
      const master = await mastersModel.getMasterById(id)
      if (!master) {
        throw new CustomError(MASTER_IS_NOT_EXIST, 404, `User with user id ${id} is not exist`)
      }
      const orders = await ordersModel.getOrdersForMasterById(id)
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
  getOrdersForCustomerById: async (customerId) => {
    try {
      const customer = await customersModel.getCustomerById(customerId)
      if (!customer) {
        throw new CustomError(
          CUSTOMER_IS_NOT_EXIST,
          404,
          `Customer with id ${customerId} is not exist`
        )
      }
      const orders = await ordersModel.getOrdersForCustomerById(customerId)
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
  }
}
