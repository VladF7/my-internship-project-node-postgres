import { Op } from 'sequelize'
import { City, Clock } from '../db/models/models.js'

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
  addCity: async (name, priceForHour) => {
    const newCity = await City.create({ name, priceForHour })
    return newCity
  },
  editCity: async (id, name, priceForHour) => {
    const editedCity = await City.update({ name, priceForHour }, { where: { id } })
    return editedCity
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
  },
  getCorrectPriceForHour: async (id) => {
    const city = await City.findByPk(id)
    const correctPriceForHour = city.priceForHour
    return correctPriceForHour
  },
  getCorrectPrice: async (id, clockId) => {
    const city = await City.findByPk(id)
    const clock = await Clock.findByPk(clockId)
    const priceForHour = city.dataValues.priceForHour
    const timeToFix = clock.dataValues.timeToFix

    const correctPrice = priceForHour * timeToFix
    return correctPrice
  }
}
