const database = require('../database')
const clocksModel = require('./clocks.model')
const dateString = require('../date')
const mastersModel = require('./masters.model')
const citiesModel = require('./cities.model')

module.exports = {
    getEndOrderDate: async(start, size) => {;
        let timeToFix = await clocksModel.getTimeToFix(size)

        let end = new Date(start)
        end = end.setHours(end.getHours() + timeToFix)
        end = dateString(end)
        return end
    },
    getOrdersByCitiesId: async(cities_id) => {
        const orders = await database.query('SELECT masters_id AS masterid, order_start_time AS start, order_end_time AS end FROM orders WHERE cities_id =$1',[cities_id])
        return orders.rows
    },
    getOrders: async() => {
        const orders = await database.query(`
            SELECT orders.id, customers.name, customers.email, clocks.size, 
            clocks.time_to_fix AS time, masters.name AS master, cities.name AS city,
            order_start_time AS start, order_end_time AS end
            FROM orders 
            INNER JOIN customers ON customers_id = customers.id 
            INNER JOIN clocks ON clocks_id = clocks.id 
            INNER JOIN masters ON masters_id = masters.id 
            INNER JOIN cities ON orders.cities_id = cities.id
            ORDER BY id DESC`)
        return orders.rows
    },
    getOrderById: async(id) => {
        const orders = await database.query(`
            SELECT orders.id, customers.name, customers.email, clocks.size, 
            clocks.time_to_fix AS time, masters.name AS master, cities.name AS city,
            order_start_time AS start, order_end_time AS end 
            FROM orders 
            INNER JOIN customers ON customers_id = customers.id 
            INNER JOIN clocks ON clocks_id = clocks.id 
            INNER JOIN masters ON masters_id = masters.id 
            INNER JOIN cities ON orders.cities_id = cities.id 
            WHERE orders.id = $1`,[id])
        return orders.rows[0]
    },
    editOrder: async(id,size,master,city,start) => {
        const cities_id = await citiesModel.getCitiesId(city)
        const masters_id = await mastersModel.getMasterById(master)
        const sizes_id = await clocksModel.getClocksId(size)


    },
    // const cities_id = await citiesModel.getCitiesId(city)
    // const editedMaster = await database.query('UPDATE masters set name=$1, rating=$2, cities_id=$3 where id = $4 RETURNING *', [name,rating,cities_id,id])
    // return editedMaster.rows

    delOrder: async(id) => {
        return await database.query("DELETE FROM orders WHERE id=$1",[id])
    }
}
