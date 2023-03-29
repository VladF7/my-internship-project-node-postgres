import citiesService from '../services/cities.service.js'
import { addCitySchema, delCitySchema } from '../validation/citiesSchema.js'

export default {
  getCities: async (req, res) => {
    try {
      const cities = await citiesService.getCities()
      return res.status(200).json(cities)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  },
  addCity: async (req, res) => {
    try {
      const body = req.body
      const { name } = addCitySchema.parse(body)
      const newCity = await citiesService.addCity(name)
      return res.status(200).json(newCity)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  delCity: async (req, res) => {
    try {
      const params = req.params
      const { id } = delCitySchema.parse(params)
      const delCityId = await citiesService.delCity(id)
      return res.status(200).json(delCityId)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  }
}
