/* eslint-disable no-useless-catch */
import CustomError from '../errors/customError.js'
import { CITY_IS_NOT_EXIST, MASTER_IS_NOT_EXIST, ORDER_IS_NOT_EXIST } from '../errors/types.js'
import citiesModel from '../models/cities.model.js'
import citiesMastersModel from '../models/citiesMasters.model.js'
import mastersModel from '../models/masters.model.js'
import ordersModel from '../models/orders.model.js'

export default {
  getMasters: async () => {
    try {
      const masters = await mastersModel.getMasters()
      return masters
    } catch (error) {
      throw error
    }
  },
  addMaster: async (name, rating, cities) => {
    try {
      const isCitiesExist = await citiesModel.isCitiesExist(cities)
      if (!isCitiesExist) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `Cities for master can't be created`)
      }
      const newMaster = await mastersModel.addMasterAndCities(name, rating, cities)
      return newMaster
    } catch (error) {
      throw error
    }
  },
  editMaster: async (id, name, rating, cities) => {
    try {
      const master = await mastersModel.getMasterById(id)
      if (!master) {
        throw new CustomError(MASTER_IS_NOT_EXIST, 400, `Master with id ${id} is not exist`)
      }
      const citiesForMaster = await citiesMastersModel.getCitiesForMaster(id)
      if (!citiesForMaster) {
        throw new CustomError(
          CITY_IS_NOT_EXIST,
          400,
          `Cities for master with id ${id} is not exist`
        )
      }
      const isCitiesExist = await citiesModel.isCitiesExist(cities)
      if (!isCitiesExist) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `Cities for master can't be created`)
      }
      const editedMaster = await mastersModel.editMasterAndCities(id, name, rating, cities)
      return editedMaster
    } catch (error) {
      throw error
    }
  },
  deleteMaster: async (id) => {
    try {
      const master = await mastersModel.getMasterById(id)
      if (!master) {
        throw new CustomError(MASTER_IS_NOT_EXIST, 400, `Master with id ${id} is not exist`)
      }
      const citiesForMaster = await citiesMastersModel.getCitiesForMaster(id)
      if (!citiesForMaster) {
        throw new CustomError(
          CITY_IS_NOT_EXIST,
          400,
          `Cities for master with id ${id} is not exist`
        )
      }
      const deletedMaster = await mastersModel.deleteMasterAndCities(id)
      return deletedMaster
    } catch (error) {
      throw error
    }
  },
  getFreeMasters: async (cityId, startTime, endTime) => {
    try {
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `City with id ${cityId} is not exist`)
      }
      const freeMasters = await mastersModel.getFreeMasters(startTime, endTime, cityId)
      return freeMasters
    } catch (error) {
      throw error
    }
  },
  getFreeMastersForCurrentOrder: async (orderId, cityId, startTime, endTime) => {
    try {
      const order = await ordersModel.getOrderById(orderId)
      if (!order) {
        throw new CustomError(ORDER_IS_NOT_EXIST, 400, `Order with id ${orderId} is not exist`)
      }
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `City with id ${cityId} is not exist`)
      }
      const freeMastersForCurrentOrder = await mastersModel.getFreeMastersForCurrentOrder(
        startTime,
        endTime,
        orderId,
        cityId
      )
      return freeMastersForCurrentOrder
    } catch (error) {
      throw error
    }
  },
  getMasterById: async (id) => {
    try {
      const master = await mastersModel.getMasterById(id)
      if (!master) {
        throw new CustomError(MASTER_IS_NOT_EXIST, 404, `Master with id ${id} is not exist`)
      }
      return master
    } catch (error) {
      throw error
    }
  }
}
