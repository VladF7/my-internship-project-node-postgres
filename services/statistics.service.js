/* eslint-disable no-useless-catch */
import { format } from 'date-fns'
import { statisticsModel } from '../models/model.layer.js'

export default {
  getNumberOfOrdersByDate: async (filters, timezone) => {
    try {
      const orders = await statisticsModel.getNumberOfOrdersByDate(filters, timezone)
      return orders.map((order) => {
        return {
          ...order,
          date: format(new Date(order.date), 'dd/MM/yy', {
            timezone
          })
        }
      })
    } catch (error) {
      throw error
    }
  },
  getNumberOfOrdersByCity: async (minMaxDate, timezone) => {
    try {
      const orders = await statisticsModel.getNumberOfOrdersByCity(minMaxDate, timezone)
      return orders
    } catch (error) {
      throw error
    }
  },
  getNumberOfOrdersByMasters: async (minMaxDate, timezone) => {
    try {
      const orders = await statisticsModel.getNumberOfOrdersByMasters(minMaxDate, timezone)
      return orders
    } catch (error) {
      throw error
    }
  },
  getMasterStatistics: async (page, limit, sort, sortBy) => {
    try {
      const masters = await statisticsModel.getMasterStatistics(page, limit, sort, sortBy)
      return masters
    } catch (error) {
      throw error
    }
  }
}
