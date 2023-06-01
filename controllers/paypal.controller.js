import { paypalService } from '../services/service.layer.js'

export default {
  webhookNotifications: async (req, res) => {
    try {
      const event = req.body.event_type
      const resource = req.body.resource

      await paypalService.checkEventType(event, resource)

      return res.sendStatus(200)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  }
}
