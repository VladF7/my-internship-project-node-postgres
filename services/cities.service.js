import citiesModel from '../models/cities.model.js'

export default {
  getCities: async () => {
    const cities = await citiesModel.getCities()
    return cities
  },
  addCity: async (name) => {
    const cityId = await citiesModel.getCitiesId(name)
    if (cityId) {
      return undefined
    } else {
      const newCity = await citiesModel.addCity(name)
      return newCity
    }
  },
  delCity: async (id) => {
    try {
      return await citiesModel.delCity(id)
    } catch (error) {
      return undefined
    }
  },
  getCitiesId: async (name) => {
    try {
      const city = await citiesModel.getCitiesId(name)
      return city.id
    } catch (error) {
      return undefined
    }
  },
  getCityById: async (id) => {
    return await citiesModel.getCityById(id)
  }
}
