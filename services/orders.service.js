const ordersModel = require('../models/orders.model')
const formDate = require('../date')

const citiesService = require('../services/cities.service')
const clocksService = require('../services/clocks.service')
const customersService = require('../services/customers.service')
const sendMailService = require('../services/mail.service')

module.exports = {
    async addOrder (masterId, name,email,size,city,start,end) {  
        let customers_id = await customersService.getCustomerId(email)

        if(!customers_id){
                await customersService.addCustomer(name,email)
            customers_id = await customersService.getCustomerId(email)
        }
        await customersService.editCustomer(customers_id, name, email) 
            const clocks_id = await clocksService.getClocksId(size)
            const cities_id = await citiesService.getCitiesId(city)
            const masters_id = masterId
        const newOrder = await ordersModel.addOrder(customers_id,clocks_id,masters_id,cities_id,start,end)
            await sendMailService.sendSuccessOrderMail (email, name, city, size, masters_id, start, end)
        return newOrder
    },
    async getEndOrderDate (start, size) {
        let timeToFix = await clocksService.getTimeToFix(size)
            timeToFix = timeToFix.time
        let end = new Date(start)
        end = end.setHours(end.getHours() + timeToFix)
        end = formDate.getFormDate(end)
        return end
    },
    async getOrders () {
        const orders = await ordersModel.getOrders()
        return orders.map(order => {return  {...order, start: formDate.getFormDate(order.start), end: formDate.getFormDate(order.end)}})
    },
    async getOrdersList () {
        return await ordersModel.getOrdersList()
    },
    async getOrderById (id) {
        const order = await ordersModel.getOrderById(id)
        return {...order, start: formDate.getFormDate(order.start), end: formDate.getFormDate(order.end)}
    },
    async editOrder (id,size,master,city,start,end) {
        const cities_id = await citiesService.getCitiesId(city)
        const master_id = master
        const clocks_id = await clocksService.getClocksId(size)
        const start_order_date = formDate.getFormDate(start)
        const end_order_date = formDate.getFormDate(end)
        const editedOrder = await ordersModel.editOrder(cities_id,master_id,clocks_id,start_order_date,end_order_date,id)
        return editedOrder
    },
    async delOrder (id) {
        return await ordersModel.delOrder(id)
    }
}
