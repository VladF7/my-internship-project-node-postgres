import { Status } from '../db/models/Status.js'

export default {
  getStatusById: async (id) => {
    const status = await Status.findByPk(id)
    return status
  },
  getStatuses: async () => {
    const statuses = await Status.findAll()
    return statuses
  },
  getConfirmedStatusId: async () => {
    const id = 1
    const status = await Status.findByPk(id)
    return status.dataValues.id
  }
}
