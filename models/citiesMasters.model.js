import { CityMaster } from '../db/models/models.DALayer.js'
export default {
  getCitiesForMaster: async (masterId) => {
    return CityMaster.findAll({ where: { masterId } })
  }
}
