import { ZodError } from 'zod'
import CustomError from '../errors/customError.js'
import mastersService from '../services/masters.service.js'
import {
  addMasterSchema,
  editMasterSchema,
  getFreeMastersForCurrentOrder,
  getFreeMastersSchema,
  getMasterByIdSchema,
  deleteMasterSchema
} from '../validation/mastersSchema.js'

export default {
  getMasters: async (req, res) => {
    try {
      const masters = await mastersService.getMasters()
      return res.status(200).json(masters)
    } catch (error) {
      return res.status(500).send('Something went wrong')
    }
  },
  getFreeMasters: async (req, res) => {
    try {
      const query = req.query
      const { cityId, startTime, endTime } = getFreeMastersSchema.parse(query)
      const freeMasters = await mastersService.getFreeMasters(cityId, startTime, endTime)
      return res.status(200).json(freeMasters)
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
  getFreeMastersForCurrentOrder: async (req, res) => {
    try {
      const query = req.query
      const params = req.params
      const { orderId, cityId, startTime, endTime } = getFreeMastersForCurrentOrder.parse({
        ...query,
        ...params
      })
      const freeMastersForCurrentOrder = await mastersService.getFreeMastersForCurrentOrder(
        orderId,
        cityId,
        startTime,
        endTime
      )
      return res.status(200).json(freeMastersForCurrentOrder)
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
  getMasterById: async (req, res) => {
    try {
      const params = req.params
      const { id } = getMasterByIdSchema.parse(params)
      const master = await mastersService.getMasterById(id)
      return res.status(200).json(master)
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
  addMaster: async (req, res) => {
    try {
      const body = req.body
      const { name, rating, cities } = addMasterSchema.parse(body)
      const newMaster = await mastersService.addMaster(name, rating, cities)
      return res.status(201).json(newMaster)
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
  editMaster: async (req, res) => {
    try {
      const body = req.body
      const params = req.params
      const { id, name, rating, cities } = editMasterSchema.parse({ ...body, ...params })
      const editedMaster = await mastersService.editMaster(id, name, rating, cities)
      return res.status(200).json(editedMaster)
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
  deleteMaster: async (req, res) => {
    try {
      const params = req.params
      const { id } = deleteMasterSchema.parse(params)
      const deletedMaster = await mastersService.deleteMaster(id)
      return res.status(200).json(deletedMaster)
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
