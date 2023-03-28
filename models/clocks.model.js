import { Clock } from '../db/models/Clock.js'

export default {
  getClockId: async (size) => {
    const clockId = await Clock.findOne({
      attributes: ['id'],
      where: { size }
    })
    return clockId
  },
  getTimeToFix: async (size) => {
    const timeToFix = await Clock.findOne({
      attributes: ['timeToFix'],
      where: { size }
    })
    return timeToFix
  }
}
