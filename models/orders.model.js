import { formatISO, getMinutes, setHours, setMinutes } from 'date-fns'
import sequelize from '../db/database.js'

import { City, Order, Master, Clock, Customer } from '../db/models/models.DALayer.js'
import { Op } from 'sequelize'

export const sortByFields = {
  ID: 'id',
  NAME: 'name',
  EMAIL: 'email',
  CLOCK: 'clock',
  TIME_TO_FIX: 'timeToFix',
  MASTER_NAME: 'masterName',
  CITY: 'city',
  START_TIME: 'startTime',
  END_TIME: 'endTime',
  PRICE: 'price',
  STATUS: 'status'
}

export const sortOptions = ['asc', 'desc']
export const limitOptions = [10, 25, 50]
export const statusFilterOptions = ['Completed', 'Confirmed', 'Canceled', '']

export default {
  getOrders: async (page, limit, sort, sortBy, filtersFields) => {
    const order = []
    const where = {}
    const filters = {
      MASTERS: filtersFields?.masters?.length,
      CITIES: filtersFields?.cities?.length,
      STATUS: filtersFields?.status,
      MIN_DATE: filtersFields?.minMaxDate?.[0],
      MAX_DATE: filtersFields?.minMaxDate?.[1],
      MIN_MAX_PRICE: filtersFields?.minMaxPrice?.length
    }
    console.log(filtersFields)
    if (filters.MASTERS) {
      where.masterId = filtersFields.masters
    }
    if (filters.CITIES) {
      where.cityId = filtersFields.cities
    }
    if (filters.STATUS) {
      where.status = filtersFields.status
    }
    const timezoneOffsetMinDate = new Date(filtersFields.minMaxDate[1]).getTimezoneOffset()
    const timezoneOffsetMaxDate = new Date(filtersFields.minMaxDate[1]).getTimezoneOffset()

    if (filters.MIN_DATE) {
      where.startTime = {
        [Op.gte]: formatISO(
          new Date(
            setMinutes(
              filtersFields.minMaxDate[0],
              getMinutes(new Date(filtersFields.minMaxDate[0])) + timezoneOffsetMinDate
            )
          )
        )
      }
    }

    if (filters.MAX_DATE) {
      where.endTime = {
        [Op.lte]: formatISO(
          new Date(
            setMinutes(setHours(filtersFields.minMaxDate[1], 23), 59 + timezoneOffsetMaxDate)
          )
        )
      }
    }
    if (filters.MIN_MAX_PRICE) {
      where.price = {
        [Op.and]: {
          [Op.gte]: filtersFields.minMaxPrice[0],
          [Op.lte]: filtersFields.minMaxPrice[1]
        }
      }
    }
    console.log(timezoneOffsetMinDate, timezoneOffsetMaxDate)
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    console.log(where)
    if (sortBy === sortByFields.NAME) {
      order[0] = [{ model: Customer }, 'name', sort]
    } else if (sortBy === sortByFields.EMAIL) {
      order[0] = [{ model: Customer }, 'email', sort]
    } else if (sortBy === sortByFields.CLOCK) {
      order[0] = [{ model: Clock }, 'size', sort]
    } else if (sortBy === sortByFields.TIME_TO_FIX) {
      order[0] = [{ model: Clock }, 'timeToFix', sort]
    } else if (sortBy === sortByFields.MASTER_NAME) {
      order[0] = [{ model: Master }, 'name', sort]
    } else if (sortBy === sortByFields.CITY) {
      order[0] = [{ model: City }, 'name', sort]
    } else {
      order[0] = [sortBy, sort]
    }
    const orders = await Order.findAndCountAll({
      where,
      limit,
      offset: page * limit,
      order,
      include: [City, Master, Customer, Clock]
    })
    return orders
  },
  getMinMaxOrdersDate: async () => {
    const minOrderDate = await Order.min('startTime')
    const maxOrderDate = await Order.max('endTime')

    return [minOrderDate, maxOrderDate]
  },
  getMinMaxOrdersPrice: async () => {
    const minOrderPrice = await Order.min('price')
    const maxOrderPrice = await Order.max('price')

    return [minOrderPrice, maxOrderPrice]
  },
  createOrderAndCreateCustomer: async (
    masterId,
    cityId,
    clockId,
    name,
    email,
    startTime,
    endTime,
    price,
    images,
    statusId
  ) => {
    const transaction = await sequelize.transaction()
    try {
      const customer = await Customer.create({ name, email }, { transaction })
      const customerId = customer.dataValues.id
      const order = await Order.create(
        {
          customerId,
          masterId,
          cityId,
          clockId,
          startTime,
          endTime,
          price,
          images,
          statusId
        },
        { transaction }
      )
      await transaction.commit()
      return order
    } catch (error) {
      await transaction.rollback()
      return null
    }
  },
  createOrderAndUpdateCustomer: async (
    masterId,
    cityId,
    clockId,
    customerId,
    name,
    startTime,
    endTime,
    price,
    images,
    statusId
  ) => {
    const transaction = await sequelize.transaction()
    try {
      await Customer.update({ name }, { where: { id: customerId }, transaction })

      const order = await Order.create(
        {
          customerId,
          masterId,
          cityId,
          clockId,
          startTime,
          endTime,
          price,
          images,
          statusId
        },
        { transaction }
      )
      await transaction.commit()
      return order
    } catch (error) {
      await transaction.rollback()
      return null
    }
  },

  getOrderById: async (id) => {
    const order = await Order.findByPk(id)
    return order
  },
  editOrder: async (id, cityId, masterId, clockId, startTime, endTime, price, status, images) => {
    const editedOrder = await Order.update(
      { cityId, masterId, clockId, startTime, endTime, price, status, images },
      { where: { id } }
    )

    return editedOrder
  },
  deleteOrder: async (id) => {
    const deletedOrder = await Order.destroy({ where: { id } })
    return deletedOrder
  },
  getOrdersForMasterById: async (masterId) => {
    const orders = await Order.findAll({
      where: {
        masterId
      },
      include: [Customer, Clock, City],
      order: [['startTime', 'DESC']]
    })
    return orders
  },
  getOrdersForCustomerById: async (customerId) => {
    const orders = await Order.findAll({
      where: {
        customerId
      },
      include: [Master, Clock, City],
      order: [['startTime', 'DESC']]
    })
    return orders
  }
}
