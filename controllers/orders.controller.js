const ordersModel = require('../models/orders.model')

module.exports = {
    getOrders: async (req,res)=>{
        try {
            const orders = await ordersModel.getOrders()
            return res.json(orders)
        } catch (error) {
            console.log(error);   
        }
    },
    getEndOrderDate: async (req,res)=>{
        try {
             const {size,start} = req.body  
             const end = await ordersModel.getEndOrderDate(start, size)
             return res.json(end)
        } catch (error) {
             console.log(error);
        }
     },
    getOrderById: async(req,res) => {
        try {
            const id = req.params.id
            const order = await ordersModel.getOrderById(id)
            return res.json(order)
        } catch (error) {
            console.log(error);
        }
    },
    editOrder: async (req,res)=>{
        try {
            const id = req.params.id
            const {size,master,city,start,end} = req.body
            const editedOrder = await ordersModel.editOrder(id,size,master,city,start,end)
            return res.json(editedOrder)
        } catch (error) {
            console.log(error);
        }
    },
    delOrder: async (req,res)=>{
        try {
            const id = req.params.id
            await ordersModel.delOrder(id)
            return res.json(id)
        } catch (error) {
            console.log(error);
        }
    },
}