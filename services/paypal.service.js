/* eslint-disable no-useless-catch */
import { Statuses } from '../db/models/Order.js'
import CustomError from '../errors/customError.js'
import { ORDER_IS_NOT_EXIST } from '../errors/types.js'
import { ordersModel } from '../models/model.layer.js'

export default {
  checkEventType: async (event, resource) => {
    try {
      if (event === 'CHECKOUT.ORDER.APPROVED') {
        const orderId = resource.purchase_units[0].custom_id
        const order = await ordersModel.getOrderById(orderId)
        if (!order) {
          throw new CustomError(ORDER_IS_NOT_EXIST, 400, `Order with id ${orderId} is not exist`)
        }
        const transactionId = resource.id
        const orderTransactionId = order.transactionId
        if (orderTransactionId === transactionId) {
          return
        } else {
          order.transactionId = transactionId
          await order.save()
          return
        }
      } else if (event === 'PAYMENT.CAPTURE.COMPLETED') {
        const orderId = resource.custom_id
        const order = await ordersModel.getOrderById(orderId)
        if (!order) {
          throw new CustomError(ORDER_IS_NOT_EXIST, 400, `Order with id ${orderId} is not exist`)
        }
        if (order.status === Statuses.PaymentSuccess) {
          return
        } else {
          order.status = Statuses.PaymentSuccess
          await order.save()
          return
        }
      }
    } catch (error) {
      throw error
    }
  }
}
