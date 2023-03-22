import citiesModel from '../models/cities.model.js'

export default {
    async getCities () {
        const cities = await citiesModel.getCities() 
        return cities
    },
    async addCity (name){
        const cityId = await citiesModel.getCitiesId(name)
        if(cityId){
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

