import ordersService from '../services/orders.service.js'

export default {
    addOrder: async (req,res) => {
        try {
            const id = req.params.id
            const {name,email,size,city,startTime,endTime} = req.body
            const newOrder = await ordersService.addOrder(id,name,email,size,city,startTime,endTime)
            return res.json(newOrder)
        } catch (error) {
            console.log(error);
        }
    },
    getOrders: async (req,res) => {
        try {
            const orders = await ordersService.getOrders()
            return res.json(orders)
        } catch (error) {
            console.log(error);   
        }
    },
    getEndOrderDate: async (req,res) => {
        try {
             const {size,startTime} = req.body  
             const end = await ordersService.getEndOrderDate(startTime, size)
             return res.json(end)
        } catch (error) {
             console.log(error);
        }
     },
    getOrderById: async (req,res) => {
        try {
            const id = req.params.id
            const order = await ordersService.getOrderById(id)
            return res.json(order)
        } catch (error) {
            console.log(error);
        }
    },
    editOrder: async (req,res) => {
        try {
            const id = req.params.id
            const {size,master,city,start,end} = req.body
            const editedOrder = await ordersService.editOrder(id,size,master,city,start,end)
            return res.json(editedOrder)
        } catch (error) {
            console.log(error);
        }
    },
    delOrder: async (req,res) => {
        try {
            const id = req.params.id
            await ordersService.delOrder(id)
            return res.json(id)
        } catch (error) {
            console.log(error);
        }
    },
}