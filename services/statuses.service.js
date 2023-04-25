/* eslint-disable no-useless-catch */
import { statusesModel } from '../models/model.layer.js'

export default {
  getStatuses: async () => {
    try {
      const statuses = await statusesModel.getOrderStatuses()
      return statuses
    } catch (error) {
      throw error
    }
  }
}
