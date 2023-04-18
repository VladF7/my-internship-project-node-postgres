import { ZodError } from 'zod'
import CustomError from '../errors/customError.js'
import { clocksService } from '../services/service.layer.js'
import { getClockByIdSchema } from '../validation/clocksSchema.js'

export default {
  getClocks: async (req, res) => {
    try {
      const clocks = await clocksService.getClocks()
      return res.status(200).json(clocks)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  },
  getClockById: async (req, res) => {
    try {
      const params = req.params
      const { id } = getClockByIdSchema.parse(params)
      const clock = await clocksService.getClockById(id)
      return res.status(200).json(clock)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  }
}
