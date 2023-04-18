import sequelize from '../db/database.js'

import { City, Order, Master, Clock, Customer } from '../db/models/models.DALayer.js'

export default {
  getOrders: async () => {
    const orders = await Order.findAll({
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
    const order = await Order.findByPk(id, {
      include: [City, Master, Customer, Clock]
    })
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
  }
}
