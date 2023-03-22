import citiesService from '../services/cities.service.js'

export default {
    getCities: async (req,res)=>{
        try {
            const cities = await citiesService.getCities()
            return res.json(cities)
        } catch (error) {
            console.log(error);
        }
    },
    addCity: async (req,res)=>{
        try {
            const {name} = req.body
            const newCity = await citiesService.addCity(name)
            return res.json(newCity)
        } catch (error) {
            console.log(error.message);
        }
    },
    delCity: async (req,res)=>{
        try {
            const id = req.params.id
            const delCityId = await citiesService.delCity(id)
            return res.json(delCityId)
        } catch (error) {
            console.log(error);
        }
    },
}