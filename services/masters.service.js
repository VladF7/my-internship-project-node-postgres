import CustomError from '../customError.js'
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
      console.log(error.message)
      throw error
    }
  },
  addMaster: async (name, rating, cities) => {
    try {
      const isCitiesExist = await citiesModel.isCitiesExist(cities)
      if (!isCitiesExist) {
        throw new CustomError('CITY_IS_NOT_EXIST', 404, `Cities for master can't be created`)
      }
      const newMaster = await mastersModel.addMasterAndCities(name, rating, cities)
      return newMaster
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  editMaster: async (masterId, name, rating, cities) => {
    try {
      const master = await mastersModel.getMasterById(masterId)
      if (!master) {
        throw new CustomError('MASTER_IS_NOT_EXIST', 404, `Master with id ${masterId} is not exist`)
      }
      const citiesForMaster = await citiesMastersModel.getCitiesForMaster(masterId)
      if (!citiesForMaster) {
        throw new CustomError(
          'CITY_IS_NOT_EXIST',
          405,
          `Cities for master with id ${masterId} is not exist`
        )
      }
      const isCitiesExist = await citiesModel.isCitiesExist(cities)
      if (!isCitiesExist) {
        throw new CustomError('CITY_IS_NOT_EXIST', 404, `Cities for master can't be created`)
      }
      const editedMaster = await mastersModel.editMasterAndCities(masterId, name, rating, cities)
      return editedMaster
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  delMaster: async (masterId) => {
    try {
      const master = await mastersModel.getMasterById(masterId)
      if (!master) {
        throw new CustomError('MASTER_IS_NOT_EXIST', 404, `Master with id ${masterId} is not exist`)
      }
      const citiesForMaster = await citiesMastersModel.getCitiesForMaster(masterId)
      if (!citiesForMaster) {
        throw new CustomError(
          'CITY_IS_NOT_EXIST',
          405,
          `Cities for master with id ${masterId} is not exist`
        )
      }
      const delMaster = await mastersModel.delMasterAndCities(masterId)
      return delMaster
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  getFreeMasters: async (cityId, startTime, endTime) => {
    try {
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError('CITY_IS_NOT_EXIST', 404, `City with id ${cityId} is not exist`)
      }
      const orders = await ordersModel.getOrders()
      if (orders.length > 0) {
        const freeMasters = await mastersModel.getFreeMasters(startTime, endTime, cityId)
        return freeMasters
      } else {
        const freeMasters = await mastersModel.getMastersByCityId(cityId)
        return freeMasters
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  getFreeMastersForCurrOrder: async (orderId, cityId, startTime, endTime) => {
    try {
      const order = await ordersModel.getOrderById(orderId)
      if (!order) {
        throw new CustomError('ORDER_IS_NOT_EXIST', 404, `Order with id ${orderId} is not exist`)
      }
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError('CITY_IS_NOT_EXIST', 404, `City with id ${cityId} is not exist`)
      }
      const freeMasters = await mastersModel.getFreeMastersForCurrOrder(
        startTime,
        endTime,
        orderId,
        cityId
      )
      return freeMasters
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  getMasterById: async (masterId) => {
    try {
      const master = await mastersModel.getMasterById(masterId)
      if (!master) {
        throw new CustomError('MASTER_IS_NOT_EXIST', 404, `Master with id ${masterId} is not exist`)
      }
      return master
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
}
