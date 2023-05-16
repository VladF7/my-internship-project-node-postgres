import sequelize from '../db/database.js'

import { City, Order, Master, Clock, Customer } from '../db/models/models.DALayer.js'

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
export const limitOptions = ['10', '25', '50']

export default {
  getOrders: async (page, limit, sort, sortBy) => {
    const order = []

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
      limit: limit,
      offset: page * limit,
      order,
      include: [City, Master, Customer, Clock]
    })
    return orders
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
          statusId
        },
        { transaction }
      )
      await transaction.commit()
      return order
    } catch (error) {
      await transaction.rollback()
      throw error
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
          statusId
        },
        { transaction }
      )
      await transaction.commit()
      return order
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  getOrderById: async (id) => {
    const order = await Order.findByPk(id)
    return order
  },
  editOrder: async (id, cityId, masterId, clockId, startTime, endTime, price, status) => {
    const editedOrder = await Order.update(
      { cityId, masterId, clockId, startTime, endTime, price, status },
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
