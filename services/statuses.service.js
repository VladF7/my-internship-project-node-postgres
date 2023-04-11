/* eslint-disable no-useless-catch */
import statusesModel from '../models/statuses.model.js'

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
