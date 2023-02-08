const citiesModel = require('../models/cities.model')

module.exports = {
    getCities: async (req,res)=>{
        const cities = await citiesModel.getCities()
        return res.json(cities)
    },
    addCity: async (req,res)=>{
        const {name} = req.body
        const newCity = await citiesModel.addCity(name)
        return res.json(newCity)
    },
    delCity: async (req,res)=>{
        const id = req.params.id
        await citiesModel.delCity(id)
        return res.json(id)
    },
}