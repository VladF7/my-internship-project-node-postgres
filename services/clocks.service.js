/* eslint-disable no-useless-catch */
import CustomError from '../errors/customError.js'
import { CLOCK_IS_NOT_EXIST } from '../errors/types.js'
import clocksModel from '../models/clocks.model.js'

export default {
  getClocks: async () => {
    try {
      const cities = await clocksModel.getClocks()
      return cities
    } catch (error) {
      throw error
    }
  },
  getClockById: async (id) => {
    try {
      const city = await clocksModel.getClockById(id)
      if (!city) {
        throw new CustomError(CLOCK_IS_NOT_EXIST, 404, `Clock with id ${id} is not exist`)
      }
      return city
    } catch (error) {
      throw error
    }
  }
}
