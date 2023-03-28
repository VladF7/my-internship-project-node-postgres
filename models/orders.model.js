import { Order } from '../db/models/Order.js'

export default {
  addOrder: async (customerId, clockId, masterId, cityId, startTime, endTime) => {
    const order = await Order.create({ customerId, clockId, masterId, cityId, startTime, endTime })
    return order
  },
  getOrders: async () => {
    const orders = await Order.findAll({
      order: [['id', 'DESC']],
      include: ['city', 'master', 'customer', 'clock']
    })
    return orders
  },

  getOrderById: async (id) => {
    const order = await Order.findOne({
      where: { id },
      include: ['city', 'master', 'customer', 'clock']
    })
    return order
  },
  editOrder: async (cityId, masterId, clockId, startTime, endTime, id) => {
    console.log(cityId, masterId, clockId, startTime, endTime, id)
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
