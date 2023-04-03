import CustomError from '../customError.js'
import citiesModel from '../models/cities.model.js'

export default {
  getCities: async () => {
    try {
      const cities = await citiesModel.getCities()
      return cities
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  addCity: async (name) => {
    try {
      const city = await citiesModel.getCityByName(name)
      if (city) {
        throw new CustomError('CITY_IS_EXIST', 405, `City with name ${name} is exist`)
      }
      const newCity = await citiesModel.addCity(name)
      return newCity
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  delCity: async (cityId) => {
    try {
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError('CITY_IS_NOT_EXIST', 404, `City with id ${cityId} is not exist`)
      }
      const delCity = await citiesModel.delCity(cityId)
      return delCity
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
}
