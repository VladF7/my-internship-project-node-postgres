import {getFormDate} from '../date.js'
import mastersModel from '../models/masters.model.js'
import citiesService from '../services/cities.service.js'
import ordersService from '../services/orders.service.js'

export default {
    getFreeMasters: async (id,city,startTime,endTime) => {
        let freeMasters;
        const cityId = await citiesService.getCitiesId(city)
        let orders = await ordersService.getOrdersList()
        if(!orders.length){
            freeMasters = await mastersModel.getMastersByCitiesId(cityId)
        } else {
            orders = orders.filter(order => order.id != id)
            orders = orders.filter((order)=> ( 
                ((getFormDate(startTime) < getFormDate(order.endTime)) && (getFormDate(endTime) > getFormDate(order.endTime))) ||
                ((getFormDate(startTime) < getFormDate(order.startTime)) && (getFormDate(endTime) > getFormDate(order.startTime))) || 
                ((getFormDate(startTime) >= getFormDate(order.startTime)) && (getFormDate(endTime) <= getFormDate(order.endTime)))
            ))
            const busyMastersId = orders.map(order => order.masterId)           
            const mastersList = await mastersModel.getMastersByCitiesId(cityId)  
            freeMasters = mastersList.filter((master) => !busyMastersId.includes(master.id))
        }
        return freeMasters.sort((a,b) => a.rating < b.rating ? 1 : -1)
    },
    getMasters: async () => {
        const res = {}
            res.masters = await mastersModel.getMasters()
            res.cities = await mastersModel.getCitiesForMaster()
        return res
    },
    getMastersByCitiesId: async (id) => {
        return await mastersModel.getMastersByCitiesId(id)
    },
    getMasterById: async (id) => {
        const res = {}
            res.master = await mastersModel.getMasterById(id)
            res.master.cities = await mastersModel.getCitiesByMasterId(id)
        return res
    },
    addMaster: async (name,rating,cities) => {
        const newMasterId = await mastersModel.addMaster(name,rating)
            await mastersModel.addCitiesForMaster(cities, newMasterId)
        return newMasterId
    }, 
    editMaster: async (id,name,rating,cities) => {
        const editedMaster = await mastersModel.editMaster(id,name,rating)
            await mastersModel.delCitiesForMaster(id)
            await mastersModel.addCitiesForMaster(cities,id)
        return editedMaster
    },
    delMaster: async (id) => {
        const isMasterBusy = await mastersModel.isMasterBusy(id)
        if(isMasterBusy){
            return undefined
        } else {
            await mastersModel.delCitiesForMaster(id)
            return await mastersModel.delMaster(id)
        }
    }, 
}

