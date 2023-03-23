import mastersService from '../services/masters.service.js'

export default {
  getFreeMasters: async (req, res) => {
    try {
      const { id, city, startTime, endTime } = req.body
      const mastersListForOrder = await mastersService.getFreeMasters(id, city, startTime, endTime)
      return res.json(mastersListForOrder)
    } catch (error) {
      console.log(error)
    }
  },
  getMasters: async (req, res) => {
    try {
      const masters = await mastersService.getMasters()
      return res.json(masters)
    } catch (error) {
      console.log(error)
    }
  },
  getMasterById: async (req, res) => {
    try {
      const id = req.params.id
      const master = await mastersService.getMasterById(id)
      return res.json(master)
    } catch (error) {
      console.log(error)
    }
  },
  addMaster: async (req, res) => {
    try {
      const { name, rating, cities } = req.body
      const newMaster = await mastersService.addMaster(name, rating, cities)
      return res.json(newMaster)
    } catch (error) {
      console.log(error.message)
    }
  },
  editMaster: async (req, res) => {
    try {
      const id = req.params.id
      const { name, rating, cities } = req.body
      const editedMaster = await mastersService.editMaster(id, name, rating, cities)
      return res.json(editedMaster)
    } catch (error) {
      console.log(error.message)
    }
  },
  delMaster: async (req, res) => {
    try {
      const id = req.params.id
      const delMasterId = await mastersService.delMaster(id)
      return res.json(delMasterId)
    } catch (error) {
      console.log(error)
    }
  }
}
