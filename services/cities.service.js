import citiesModel from '../models/cities.model.js'

export default {
  getCities: async () => {
    const cities = await citiesModel.getCities()
    return cities
  },
  addCity: async (name) => {
    try {
      const newCity = await citiesModel.addCity(name)
      return newCity
    } catch (error) {
      return undefined
    }
  },
  delCity: async (cityId) => {
    try {
      const delCity = await citiesModel.delCity(cityId)
      return delCity
    } catch (error) {
      return undefined
    }
  },
  getCityId: async (name) => {
    try {
      const city = await citiesModel.getCityId(name)
      return city
    } catch (error) {
      return undefined
    }
  },
  getCityById: async (id) => {
    return await citiesModel.getCityById(id)
  }
}
