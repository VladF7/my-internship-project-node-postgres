const mastersModel = require('../models/masters.model')
const formDate = require('../date')

const citiesService = require('../services/cities.service')
const ordersService = require('../services/orders.service')

module.exports = {
    async getFreeMasters (id,city,start,end) {
        let freeMasters;
        const cities_id = await citiesService.getCitiesId(city)
        let orders = await ordersService.getOrdersList()
        if(!orders.length){
            freeMasters = await mastersModel.getMastersByCitiesId(cities_id)
        } else {
            orders = orders.filter(order => order.id != id)
            orders = orders.filter((order)=> ( 
                ((formDate.getFormDate(start) < formDate.getFormDate(order.end)) && (formDate.getFormDate(end) > formDate.getFormDate(order.end))) ||
                ((formDate.getFormDate(start) < formDate.getFormDate(order.start)) && (formDate.getFormDate(end) > formDate.getFormDate(order.start))) || 
                ((formDate.getFormDate(start) >= formDate.getFormDate(order.start)) && (formDate.getFormDate(end) <= formDate.getFormDate(order.end)))
            ))
            const busyMastersId = orders.map(order => order.masters_id)           
            const mastersList = await mastersModel.getMastersByCitiesId(cities_id)  
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
        const new_master_id = await mastersModel.addMaster(name,rating)
            await mastersModel.addCitiesForMaster(cities, new_master_id)
        return new_master_id
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

