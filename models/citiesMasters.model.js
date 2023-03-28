import { CityMaster } from '../db/models/CityMaster.js'

export default {
  addCitiesForMaster: async (cities, masterId) => {
    return cities.forEach(async (cityId) => await CityMaster.create({ cityId, masterId }))
  },
  delCitiesForMaster: async (masterId) => {
    return await CityMaster.destroy({ where: { masterId } })
  }
}
