import { Clock } from '../db/models/Clock.js'

export default {
  getClockId: async (size) => {
    const clockId = await Clock.findOne({
      attributes: ['id'],
      where: { size }
    })
    return clockId.dataValues.id
  },
  getTimeToFix: async (size) => {
    const timeToFix = await Clock.findOne({
      attributes: ['timeToFix'],
      where: { size }
    })
    return timeToFix.dataValues.timeToFix
  }
}
