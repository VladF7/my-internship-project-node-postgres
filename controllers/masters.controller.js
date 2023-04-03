import { ZodError } from 'zod'
import CustomError from '../customError.js'
import mastersService from '../services/masters.service.js'
import {
  addMasterSchema,
  editMasterSchema,
  getFreeMastersForCurrOrder,
  getFreeMastersSchema,
  getMasterByIdSchema
} from '../validation/mastersSchema.js'

export default {
  getMasters: async (req, res) => {
    try {
      const masters = await mastersService.getMasters()
      return res.status(200).json(masters)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
  },
  getFreeMasters: async (req, res) => {
    try {
      const body = req.body
      const { cityId, startTime, endTime } = getFreeMastersSchema.parse(body)
      const mastersListForOrder = await mastersService.getFreeMasters(cityId, startTime, endTime)
      return res.status(200).json(mastersListForOrder)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        console.log(error)
        return res.status(500).send(error)
      }
    }
  },
  getFreeMastersForCurrOrder: async (req, res) => {
    try {
      const body = req.body
      const params = req.params
      const { id, cityId, startTime, endTime } = getFreeMastersForCurrOrder.parse({
        ...body,
        ...params
      })
      const mastersListForOrder = await mastersService.getFreeMastersForCurrOrder(
        id,
        cityId,
        startTime,
        endTime
      )
      return res.status(200).json(mastersListForOrder)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        console.log(error)
        return res.status(500).send(error)
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
        console.log(error)
        return res.status(500).send(error)
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
        console.log(error)
        return res.status(500).send(error)
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
        console.log(error)
        return res.status(500).send(error)
      }
    }
  },
  delMaster: async (req, res) => {
    try {
      const id = req.params.id
      const delMasterId = await mastersService.delMaster(id)
      return res.status(200).json(delMasterId)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        console.log(error)
        return res.status(500).send(error)
      }
    }
  }
}
