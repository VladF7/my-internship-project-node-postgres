import { Master } from '../db/models/Master.js'
import { City } from '../db/models/Сity.js'

export default {
  getMasters: async () => {
    const masters = await Master.findAll({
      include: [
        {
          model: City,
          as: 'cities'
        }
      ]
    })
    return masters
  },
  getMastersByCityId: async (id) => {
    const masters = await Master.findAll({
      include: [
        {
          where: { id },
          model: City,
          as: 'cities'
        }
      ]
    })
    return masters
  },
  getMasterById: async (id) => {
    const master = await Master.findOne({
      where: { id },
      include: [
        {
          model: City,
          as: 'cities'
        }
      ]
    })
    return master
  },
  addMaster: async (name, rating) => {
    const newMaster = await Master.create({ name, rating })
    return newMaster
  },
  editMaster: async (id, name, rating) => {
    const editedMaster = await Master.update({ name, rating }, { where: { id } })
    return editedMaster
  },
  delMaster: async (id) => {
    return await Master.destroy({ where: { id } })
  }
}
