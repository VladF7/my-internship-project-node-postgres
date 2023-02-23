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
            const {name,rating,cities} = req.body
            const newMaster = await mastersModel.addMaster(name,rating,cities)
            return res.json(newMaster)
        } catch (error) {
            console.log(error.message);
        }
    },
    editMaster: async (req,res)=>{
        try {
            const id = req.params.id
            const {name,rating,cities} = req.body
            const editedMaster = await mastersModel.editMaster(id,name,rating,cities)
            return res.json(editedMaster)
        } catch (error) {
            console.log(error.message);
        }
    },
    delMaster: async (req,res)=>{
        try {
            const id = req.params.id
            const delMasterId = await mastersModel.delMaster(id)
            return res.json(delMasterId)
        } catch (error) {
            console.log(error);
        }
    },
}