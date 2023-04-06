/* eslint-disable no-useless-catch */
import clocksModel from '../models/clocks.model.js'

export default {
  getClocks: async () => {
    try {
      const cities = await clocksModel.getClocks()
      return cities
    } catch (error) {
      throw error
    }
  }
}
