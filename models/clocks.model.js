import { Clock } from '../db/models/Clock.js'

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
