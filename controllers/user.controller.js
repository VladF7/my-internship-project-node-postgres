const userModel = require('../models/user.model')

module.exports = {
    getFreeMasters: async(req,res)=>{
        try {
            const {city,start,end} = req.body
            const mastersListForOrder = await userModel.getFreeMasters(city,start,end)
            return res.json(mastersListForOrder)
        } catch (error) {
            console.log(error);
        }
    },
    addOrder: async (req,res)=>{
        try {
            const id = req.params.id
            const {name,email,size,city,start,end} = req.body
            const newOrder = await userModel.addOrder(id,name,email,size,city,start,end)
            return res.json(newOrder)
        } catch (error) {
            console.log(error);
        }
    }
}