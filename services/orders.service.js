import {getFormDate} from '../date.js'
import ordersModel from '../models/orders.model.js'
import citiesService from '../services/cities.service.js'
import clocksService from '../services/clocks.service.js'
import customersService from '../services/customers.service.js'
import sendMailService from '../services/mail.service.js'

export default {
    addOrder: async (masterId, name,email,size,city,startTime,endTime) => {  
        let customerId = await customersService.getCustomerId(email)

        if(!customerId){
            await customersService.addCustomer(name,email)
            customerId = await customersService.getCustomerId(email)
        }
        await customersService.editCustomer(customerId, name, email) 
            const clockId = await clocksService.getClocksId(size)
            const cityId = await citiesService.getCitiesId(city)
        const newOrder = await ordersModel.addOrder(customerId,clockId,masterId,cityId,startTime,endTime)
            await sendMailService.sendSuccessOrderMail (email, name, city, size, masterId, startTime, endTime)
        return newOrder
    },
    getEndOrderDate: async (startTime, size) => {
        let timeToFix = await clocksService.getTimeToFix(size)
        let endTime = new Date(startTime)
            endTime = endTime.setHours(endTime.getHours() + timeToFix)
            endTime = getFormDate(endTime)
        return endTime
    },
    getOrders: async () => {
        const orders = await ordersModel.getOrders()
        return orders.map(order => {return  {...order, startTime: getFormDate(order.startTime), endTime: getFormDate(order.endTime)}})
    },
    getOrdersList: async () => {
        return await ordersModel.getOrdersList()
    },
    getOrderById: async (id) => {
        const order = await ordersModel.getOrderById(id)
        return {...order, startTime: getFormDate(order.startTime), endTime: getFormDate(order.endTime)}
    },
    editOrder: async (id,size,masterId,city,start,end) => {
        const cityId = await citiesService.getCitiesId(city)
        const clockId = await clocksService.getClocksId(size)
        const startTime = getFormDate(start)
        const endTime = getFormDate(end)
        const editedOrder = await ordersModel.editOrder(cityId,masterId,clockId,startTime,endTime,id)
        return editedOrder
    },
    delOrder: async (id) => {
        return await ordersModel.delOrder(id)
    }
}
