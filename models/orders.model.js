import sequelize from '../db/database.js'

import { Order } from '../db/models/Order.js'
import { City } from '../db/models/Сity.js'
import { Master } from '../db/models/Master.js'
import { Customer } from '../db/models/Сustomer.js'
import { Clock } from '../db/models/Clock.js'

export default {
  getOrders: async () => {
    const orders = await Order.findAll({
      logging: false,
      order: [['id', 'DESC']],
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
    endTime
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
          endTime
        },
        { transaction }
      )
      await transaction.commit()
      if (order) {
        return order
      }
    } catch (error) {
      await transaction.rollback()
    }
  },
  createOrderAndUpdateCustomer: async (
    masterId,
    cityId,
    clockId,
    customerId,
    name,
    startTime,
    endTime
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
          endTime
        },
        { transaction }
      )
      await transaction.commit()
      if (order) {
        return order
      }
    } catch (error) {
      await transaction.rollback()
    }
  },

  getOrderById: async (id) => {
    const order = await Order.findByPk(id, {
      include: [City, Master, Customer, Clock]
    })
    return order
  },
  editOrder: async (cityId, masterId, clockId, startTime, endTime, id) => {
    const editedOrder = await Order.update(
      { cityId, masterId, clockId, startTime, endTime },
      { where: { id } }
    )
    return editedOrder
  },
  delOrder: async (id) => {
    const delOrder = await Order.destroy({ where: { id } })
    return delOrder
  }
}
