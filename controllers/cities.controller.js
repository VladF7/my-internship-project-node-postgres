import { ZodError } from 'zod'
import CustomError from '../customError.js'
import citiesService from '../services/cities.service.js'
import { addCitySchema, delCitySchema } from '../validation/citiesSchema.js'

export default {
  getCities: async (req, res) => {
    try {
      const cities = await citiesService.getCities()
      return res.status(200).json(cities)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
  },
  addCity: async (req, res) => {
    try {
      const body = req.body
      const { name } = addCitySchema.parse(body)
      const newCity = await citiesService.addCity(name)
      return res.status(201).json(newCity)
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error)
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        console.log(error.issues)
        return res.status(400).send(error.issues)
      } else {
        console.log(error)
        return res.status(500).send(error)
      }
    }
  },
  delCity: async (req, res) => {
    try {
      const params = req.params
      const { id } = delCitySchema.parse(params)
      const delCityId = await citiesService.delCity(id)
      return res.status(200).json(delCityId)
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        console.log(error.issues)
        return res.status(400).send(error.issues)
      } else {
        console.log(error)
        return res.status(500).send(error)
      }
    }
  }
}
