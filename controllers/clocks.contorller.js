import clocksService from '../services/clocks.service.js'

export default {
  getClocks: async (req, res) => {
    try {
      const clocks = await clocksService.getClocks()
      return res.status(200).json(clocks)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  }
}
