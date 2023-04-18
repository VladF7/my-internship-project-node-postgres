import { ZodError } from 'zod'
import CustomError from '../errors/customError.js'
import { citiesService } from '../services/service.layer.js'
import {
  addCitySchema,
  deleteCitySchema,
  editCitySchema,
  getCityByIdSchema
} from '../validation/citiesSchema.js'

export default {
  getCities: async (req, res) => {
    try {
      const cities = await citiesService.getCities()
      return res.status(200).json(cities)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  },
  getCityById: async (req, res) => {
    try {
      const params = req.params
      const { id } = getCityByIdSchema.parse(params)
      const city = await citiesService.getCityById(id)
      return res.status(200).json(city)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },
  editCity: async (req, res) => {
    try {
      const body = req.body
      const params = req.params
      const { id, name, priceForHour } = editCitySchema.parse({ ...body, ...params })
      const editedCity = await citiesService.editCity(id, name, priceForHour)
      return res.status(200).json(editedCity)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },
  addCity: async (req, res) => {
    try {
      const body = req.body
      const { name, priceForHour } = addCitySchema.parse(body)
      const newCity = await citiesService.addCity(name, priceForHour)
      return res.status(201).json(newCity)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },
  deleteCity: async (req, res) => {
    try {
      const params = req.params
      const { id } = deleteCitySchema.parse(params)
      const deletedCity = await citiesService.deleteCity(id)
      return res.status(200).json(deletedCity)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  }
}
