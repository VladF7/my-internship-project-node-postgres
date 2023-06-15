import { statisticsService } from '../services/service.layer.js'
import {
  getMasterStatisticsSchema,
  getNumberOfOrdersByDateSchema,
  getNumberOfOrdersSchema
} from '../validation/statisticsSchema.js'

export default {
  getNumberOfOrdersByDate: async (req, res) => {
    try {
      const { queryParams } = req.query
      const decodedQueryParams = JSON.parse(decodeURIComponent(queryParams))
      const { filters, timezone } = getNumberOfOrdersByDateSchema.parse(decodedQueryParams)
      const orders = await statisticsService.getNumberOfOrdersByDate(filters, timezone)
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  },
  getNumberOfOrdersByCity: async (req, res) => {
    try {
      const { queryParams } = req.query
      const decodedQueryParams = JSON.parse(decodeURIComponent(queryParams))
      const { minMaxDate, timezone } = getNumberOfOrdersSchema.parse(decodedQueryParams)
      const orders = await statisticsService.getNumberOfOrdersByCity(minMaxDate, timezone)
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  },
  getNumberOfOrdersByMasters: async (req, res) => {
    try {
      const { queryParams } = req.query
      const decodedQueryParams = JSON.parse(decodeURIComponent(queryParams))
      const { minMaxDate, timezone } = getNumberOfOrdersSchema.parse(decodedQueryParams)
      const orders = await statisticsService.getNumberOfOrdersByMasters(minMaxDate, timezone)
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  },
  getMasterStatistics: async (req, res) => {
    try {
      const { queryParams } = req.query
      const decodedQueryParams = JSON.parse(decodeURIComponent(queryParams))
      const { page, limit, sort, sortBy } = getMasterStatisticsSchema.parse(decodedQueryParams)
      const masters = await statisticsService.getMasterStatistics(page, limit, sort, sortBy)
      return res.status(200).json(masters)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  }
}
