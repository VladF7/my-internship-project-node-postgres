const database = require('../database')
const ordersModel = require('./orders.model')
const citiesModel = require('./cities.model')
const mastersModel = require('./masters.model');
const customersModel = require('./customers.model')
const clocksModel = require('./clocks.model')
const dateString = require('../date')

module.exports = {
    getFreeMasters: async(city,start,end)=>{
        try {
            let freeMasters;

            const cities_id = await citiesModel.getCitiesId(city)
            let orders = await ordersModel.getOrdersByCitiesId(cities_id)
            
            if(!orders.length){
                freeMasters = await mastersModel.getMastersByCitiesId(cities_id)
            } else {
                orders = orders.filter((order)=> ( 
                    ((start < dateString(order.start)) && (end > dateString(order.start))) || 
                    ((start < dateString(order.end)) && (end > dateString(order.end))) || 
                    ((start >= dateString(order.start)) && (end <= dateString(order.end)))
                ))

                const busyMastersId = orders.map(order => order.masterid)
                const mastersList = await mastersModel.getMastersByCitiesId(cities_id)

                freeMasters = mastersList.filter((master) => !busyMastersId.includes(master.id))
            }
            return freeMasters

        } catch (error) {
            console.log(error);
        }
    },
    addOrder: async(masterId, name,email,size,city,start,end)=>{

            const customers = await customersModel.addCustomer(name,email)

            const customers_id = await customersModel.getCustomerId(email)
            const clocks_id = await clocksModel.getClocksId(size)
            const cities_id = await citiesModel.getCitiesId(city)
            const masters_id = masterId
            
            const newOrder = await database.query(`
                INSERT INTO orders (customers_id,clocks_id,masters_id,cities_id,order_start_time,order_end_time) 
                VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`
                ,[customers_id,clocks_id,masters_id,cities_id,start,end]
            )
            return newOrder.rows
    }
}
