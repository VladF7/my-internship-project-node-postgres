import mastersService from '../services/masters.service.js'
import {
  addMasterSchema,
  editMasterSchema,
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
      return res.status(400).json(error)
    }
  },
  getFreeMasters: async (req, res) => {
    try {
      const body = req.body
      const { id, city, startTime, endTime } = getFreeMastersSchema.parse(body)
      const mastersListForOrder = await mastersService.getFreeMasters(id, city, startTime, endTime)
      return res.json(mastersListForOrder)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  getMasterById: async (req, res) => {
    try {
      const params = req.params
      const { id } = getMasterByIdSchema.parse(params)
      const master = await mastersService.getMasterById(id)
      return res.json(master)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  addMaster: async (req, res) => {
    try {
      const body = req.body
      const { name, rating, cities } = addMasterSchema.parse(body)
      const newMaster = await mastersService.addMaster(name, rating, cities)
      return res.json(newMaster)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  editMaster: async (req, res) => {
    try {
      const body = req.body
      const params = req.params
      const { id, name, rating, cities } = editMasterSchema.parse({ ...body, ...params })
      const editedMaster = await mastersService.editMaster(id, name, rating, cities)
      return res.json(editedMaster)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  delMaster: async (req, res) => {
    try {
      const id = req.params.id
      const delMasterId = await mastersService.delMaster(id)
      return res.json(delMasterId)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  }
}
