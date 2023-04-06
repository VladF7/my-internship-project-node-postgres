import statusesService from '../services/statuses.service.js'

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
