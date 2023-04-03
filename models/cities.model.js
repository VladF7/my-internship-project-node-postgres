import { City } from '../db/models/models.js'

export default {
  getCities: async () => {
    const cities = await City.findAll()
    return cities
  },
  isCitiesExist: async (masterCities) => {
    let allCities = await City.findAll({ attributes: ['id'] })
    allCities = allCities.map((city) => city.dataValues.id)
    return masterCities.every((city) => allCities.includes(city))
  },
  addCity: async (name) => {
    const newCity = await City.create({ name })
    return newCity
  },
  delCity: async (id) => {
    const delCity = await City.destroy({
      where: { id }
    })
    return delCity
  },
  getCityByName: async (name) => {
    const city = await City.findOne({
      where: { name }
    })
    return city
  },
  getCityById: async (id) => {
    const city = await City.findByPk(id)
    return city
  }
}
