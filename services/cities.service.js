/* eslint-disable no-useless-catch */
import CustomError from '../errors/customError.js'
import { citiesModel } from '../models/model.layer.js'
import { CITY_IS_EXIST, CITY_IS_NOT_EXIST } from '../errors/types.js'

export default {
  getCities: async () => {
    try {
      const cities = await citiesModel.getCities()
      return cities
    } catch (error) {
      throw error
    }
  },
  addCity: async (name, priceForHour) => {
    try {
      const city = await citiesModel.getCityByName(name)
      if (city) {
        throw new CustomError(CITY_IS_EXIST, 405, `City with name ${name} is exist`)
      }
      const newCity = await citiesModel.addCity(name, priceForHour)
      return newCity
    } catch (error) {
      throw error
    }
  },
  getCityById: async (id) => {
    try {
      const city = await citiesModel.getCityById(id)
      if (!city) {
        throw new CustomError(CITY_IS_NOT_EXIST, 404, `City with id ${id} is not exist`)
      }
      return city
    } catch (error) {
      throw error
    }
  },
  editCity: async (id, name, priceForHour) => {
    try {
      const city = await citiesModel.getCityById(id)
      if (!city) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `City with id ${id} is not exist`)
      }
      const editedCity = await citiesModel.editCity(id, name, priceForHour)
      return editedCity
    } catch (error) {
      throw error
    }
  },
  deleteCity: async (id) => {
    try {
      const city = await citiesModel.getCityById(id)
      if (!city) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `City with id ${id} is not exist`)
      }
      const deletedCity = await citiesModel.deleteCity(id)
      if (!deletedCity) {
        throw new Error()
      }
      return id
    } catch (error) {
      throw error
    }
  }
}
