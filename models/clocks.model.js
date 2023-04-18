import { Clock } from '../db/models/models.js'

export default {
  getClockById: async (id) => {
    const clock = await Clock.findByPk(id)
    return clock
  },
  getClocks: async () => {
    const clocks = await Clock.findAll()
    return clocks
  }
}
