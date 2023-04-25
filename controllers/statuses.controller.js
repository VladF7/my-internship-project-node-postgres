import { statusesService } from '../services/service.layer.js'

export default {
  getStatuses: async (req, res) => {
    try {
      const statuses = await statusesService.getStatuses()
      return res.status(200).json(statuses)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  }
}
