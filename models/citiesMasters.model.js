import { CityMaster } from '../db/models/CityMaster.js'

export default {
  addCitiesForMaster: async (cities, masterId) => {
    return CityMaster.bulkCreate(cities.map((cityId) => ({ cityId, masterId })))
  },
  delCitiesForMaster: async (masterId) => {
    return await CityMaster.destroy({ where: { masterId } })
  }
}
