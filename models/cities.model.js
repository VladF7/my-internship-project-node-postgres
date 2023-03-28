import { City } from '../db/models/models.js'

export default {
  getCities: async () => {
    const cities = await City.findAll()
    return cities
  },
  addCity: async (name) => {
    const newCity = await City.create({ name })
    return newCity
  },
  delCity: async (id) => {
    return await City.destroy({
      where: { id }
    })
  },
  getCityId: async (name) => {
    const cityId = await City.findOne({
      attributes: ['id'],
      where: { name }
    })
    return cityId.dataValues.id
  },
  getCityById: async (id) => {
    const city = await City.findByPk(id)
    return city
  }
}
