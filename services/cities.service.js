const citiesModel = require('../models/cities.model')

module.exports = {
    async getCities () {
        const cities = await citiesModel.getCities() 
        return cities
    },
    async addCity (name){
        const cities_id = await citiesModel.getCitiesId(name)
        if(cities_id){
            return undefined
        } else {
            const newCity = await citiesModel.addCity(name)
            return newCity
        }   
    },
    async delCity (id) {
        try {
            return await citiesModel.delCity(id)
        } catch (error) {
            return undefined
        }
    },
    async getCitiesId (name) {
        try {
            const city = await citiesModel.getCitiesId(name) 
            return city.id
        } catch (error) {
            return undefined
        }  
    },
    async getCityById (id){
        return await citiesModel.getCityById(id)
    }
}