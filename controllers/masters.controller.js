const mastersModel = require('../models/masters.model')

module.exports = {
    getMasters: async (req,res)=>{
        const masters = await mastersModel.getMasters()
        return res.json(masters)
    },
    getMasterById: async (req,res)=>{
        const id = req.params.id
        const master = await mastersModel.getMasterById(id)
        return res.json(master)
    },
    addMaster: async (req,res)=>{
        const {name,rating,city} = req.body
        const newMaster = await mastersModel.addMaster(name,rating,city)
        return res.json(newMaster)
    },
    editMaster: async (req,res)=>{
        const id = req.params.id
        const {name,rating,city} = req.body
        const editedMaster = await mastersModel.editMaster(id,name,rating,city)
        return res.json(editedMaster)
    },
    delMaster: async (req,res)=>{
        const id = req.params.id
        await mastersModel.delMaster(id)
        return res.json(id)
    } 
}