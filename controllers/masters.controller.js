const mastersModel = require('../models/masters.model')

module.exports = {
    getMasters: async (req,res)=>{
        try {
            const masters = await mastersModel.getMasters()
            return res.json(masters)
        } catch (error) {
            console.log(error);
        }
    },
    getMasterById: async (req,res)=>{
        try {
            const id = req.params.id
            const master = await mastersModel.getMasterById(id)
            return res.json(master)
        } catch (error) {
            console.log(error);
        }
    },
    addMaster: async (req,res)=>{
        try {
            const {name,rating,city} = req.body
            const newMaster = await mastersModel.addMaster(name,rating,city)
            return res.json(newMaster)
        } catch (error) {
            console.log(error);
        }
    },
    editMaster: async (req,res)=>{
        try {
            const id = req.params.id
            const {name,rating,city} = req.body
            const editedMaster = await mastersModel.editMaster(id,name,rating,city)
            return res.json(editedMaster)
        } catch (error) {
            console.log(error);
        }
    },
    delMaster: async (req,res)=>{
        try {
            const id = req.params.id
            await mastersModel.delMaster(id)
            return res.json(id)
        } catch (error) {
            console.log(error);
            return res.json(error.severity)
        }
    },
}