import { CityMaster } from '../db/models/CityMaster.js'

export default {
  getCitiesForMaster: async (masterId) => {
    return CityMaster.findAll({ where: { masterId } })
  }
}
