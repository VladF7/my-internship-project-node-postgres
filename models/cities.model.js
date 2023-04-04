import { Op } from 'sequelize'
import { City } from '../db/models/models.js'

export default {
  getCities: async () => {
    const cities = await City.findAll()
    return cities
  },
  isCitiesExist: async (cities) => {
    const existCities = await City.findAll({
      attributes: ['id'],
      where: { id: { [Op.in]: cities } }
    })
    return cities.length === existCities.length
  },
  addCity: async (name) => {
    const newCity = await City.create({ name })
    return newCity
  },
  deleteCity: async (id) => {
    const deletedCity = await City.destroy({
      where: { id }
    })
    return deletedCity
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
