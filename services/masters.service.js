const mastersModel = require('../models/masters.model')
const formDate = require('../date')

const citiesService = require('../services/cities.service')
const ordersService = require('../services/orders.service')

module.exports = {
    async getFreeMasters (id,city,startTime,endTime) {
        let freeMasters;
        const cityId = await citiesService.getCitiesId(city)
        let orders = await ordersService.getOrdersList()
        if(!orders.length){
            freeMasters = await mastersModel.getMastersByCitiesId(cityId)
        } else {
            orders = orders.filter(order => order.id != id)
            orders = orders.filter((order)=> ( 
                ((formDate.getFormDate(startTime) < formDate.getFormDate(order.endTime)) && (formDate.getFormDate(endTime) > formDate.getFormDate(order.endTime))) ||
                ((formDate.getFormDate(startTime) < formDate.getFormDate(order.startTime)) && (formDate.getFormDate(endTime) > formDate.getFormDate(order.startTime))) || 
                ((formDate.getFormDate(startTime) >= formDate.getFormDate(order.startTime)) && (formDate.getFormDate(endTime) <= formDate.getFormDate(order.endTime)))
            ))
            const busyMastersId = orders.map(order => order.masterId)           
            const mastersList = await mastersModel.getMastersByCitiesId(cityId)  
            freeMasters = mastersList.filter((master) => !busyMastersId.includes(master.id))
        }
        return freeMasters.sort((a,b) => a.rating < b.rating ? 1 : -1)
    },
    async getMasters () {
        const res = {}
            res.masters = await mastersModel.getMasters()
            res.cities = await mastersModel.getCitiesForMaster()
        return res
    },
    async getMastersByCitiesId (id) {
        return await mastersModel.getMastersByCitiesId(id)
    },
    async getMasterById (id) {
        const res = {}
            res.master = await mastersModel.getMasterById(id)
            res.master.cities = await mastersModel.getCitiesByMasterId(id)
        return res
    },
    async addMaster (name,rating,cities) {
        const newMasterId = await mastersModel.addMaster(name,rating)
            await mastersModel.addCitiesForMaster(cities, newMasterId)
        return newMasterId
     }, 
     async editMaster (id,name,rating,cities) {
        const editedMaster = await mastersModel.editMaster(id,name,rating)
            await mastersModel.delCitiesForMaster(id)
            await mastersModel.addCitiesForMaster(cities,id)
        return editedMaster
    },
    async delMaster (id) {
        const isMasterBusy = await mastersModel.isMasterBusy(id)
        if(isMasterBusy){
            return undefined
        } else {
            await mastersModel.delCitiesForMaster(id)
            return await mastersModel.delMaster(id)
        }
    }, 
}

