import { getFormDate } from '../date.js'
import citiesMastersModel from '../models/citiesMasters.model.js'
import mastersModel from '../models/masters.model.js'
import citiesService from '../services/cities.service.js'
import ordersService from '../services/orders.service.js'

export default {
  getMasters: async () => {
    const masters = await mastersModel.getMasters()
    return masters
  },
  getMastersByCityId: async (id) => {
    const master = await mastersModel.getMastersByCityId(id)
    return master
  },
  getMasterById: async (id) => {
    const master = await mastersModel.getMasterById(id)
    return master
  },
  addMaster: async (name, rating, cities) => {
    const newMasterId = await mastersModel.addMaster(name, rating)
    await citiesMastersModel.addCitiesForMaster(cities, newMasterId.id)
    return newMasterId
  },
  editMaster: async (id, name, rating, cities) => {
    const editedMaster = await mastersModel.editMaster(id, name, rating)
    await citiesMastersModel.delCitiesForMaster(id)
    await citiesMastersModel.addCitiesForMaster(cities, id)
    return editedMaster
  },
  delMaster: async (masterId) => {
    try {
      await citiesMastersModel.delCitiesForMaster(masterId)
      return await mastersModel.delMaster(masterId)
    } catch (error) {
      return undefined
    }
  },
  getFreeMasters: async (id, city, startTime, endTime) => {
    const cityId = await citiesService.getCityId(city)
    let freeMasters = await mastersModel.getMastersByCityId(cityId)
    let orders = await ordersService.getOrders()
    if (!orders.length) {
      freeMasters = await mastersModel.getMastersByCityId(cityId)
    } else {
      orders = orders.filter((order) => order.id != id)
      orders = orders.filter(
        (order) =>
          (getFormDate(startTime) < getFormDate(order.endTime) &&
            getFormDate(endTime) > getFormDate(order.endTime)) ||
          (getFormDate(startTime) < getFormDate(order.startTime) &&
            getFormDate(endTime) > getFormDate(order.startTime)) ||
          (getFormDate(startTime) >= getFormDate(order.startTime) &&
            getFormDate(endTime) <= getFormDate(order.endTime))
      )
      const busyMastersId = orders.map((order) => order.masterId)
      const mastersList = await mastersModel.getMastersByCityId(cityId)
      freeMasters = mastersList.filter((master) => !busyMastersId.includes(master.id))
    }
    return freeMasters.sort((a, b) => (a.rating < b.rating ? 1 : -1))
  }
}
