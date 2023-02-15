const citiesModel = require('../models/cities.model')

module.exports = {
    getCities: async (req,res)=>{
        try {
            const cities = await citiesModel.getCities()
            return res.json(cities)
        } catch (error) {
            console.log(error);
        }
    },
    addCity: async (req,res)=>{
        try {
            const {name} = req.body
            const newCity = await citiesModel.addCity(name)
            return res.json(newCity)
        } catch (error) {
            console.log(error);
        }
    },
    delCity: async (req,res)=>{
        try {
            const id = req.params.id
            await citiesModel.delCity(id)
            return res.json(id)
        } catch (error) {
            console.log(error);
            return res.json(error.severity)
        }
    },
}