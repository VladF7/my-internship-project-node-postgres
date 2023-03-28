import clocksModel from '../models/clocks.model.js'

export default {
  getClockId: async (size) => {
    const clockId = await clocksModel.getClockId(size)
    return clockId.id
  },
  getTimeToFix: async (size) => {
    const timeToFix = await clocksModel.getTimeToFix(size)
    return timeToFix.timeToFix
  }
}
