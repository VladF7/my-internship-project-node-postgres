import { Order } from '../db/models/Order.js'
import { City } from '../db/models/Сity.js'
import { Master } from '../db/models/Master.js'
import { Customer } from '../db/models/Сustomer.js'
import { Clock } from '../db/models/Clock.js'

export default {
  addOrder: async (customerId, clockId, masterId, cityId, startTime, endTime) => {
    const order = await Order.create({ customerId, clockId, masterId, cityId, startTime, endTime })
    return order
  },
  getOrders: async () => {
    const orders = await Order.findAll({
      order: [['id', 'DESC']],
      include: [City, Master, Customer, Clock]
    })
    return orders
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
    return await Order.destroy({ where: { id } })
  }
}
