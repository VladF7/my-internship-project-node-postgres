import { Order } from '../db/models/models.js'

export default {
  getOrderStatuses: async () => {
    const statuses = await Order.getAttributes().status.values
    return statuses
  },
  checkCorrectOrderStatus: async (status) => {
    const statuses = await Order.getAttributes().status.values
    return statuses.includes(status)
  }
}
