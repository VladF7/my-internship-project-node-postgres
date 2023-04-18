import { CityMaster } from '../db/models/models.js'
export default {
  getCitiesForMaster: async (masterId) => {
    return CityMaster.findAll({ where: { masterId } })
  }
}
