const database = require('../database')
const clocksModel = require('./clocks.model')
const dateString = require('../date')
const mastersModel = require('./masters.model')
const citiesModel = require('./cities.model')

module.exports = {
    async getEndOrderDate (start, size) {;
        let timeToFix = await clocksModel.getTimeToFix(size)
            timeToFix = timeToFix.time
        let end = new Date(start)
        end = end.setHours(end.getHours() + timeToFix)
        end = dateString(end)
        return end
    },
    async getOrders () {
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
    async getOrdersList () {
        let orders = await database.query(`SELECT masters_id, cities_id,
            order_start_time AS start, order_end_time AS end
            FROM orders `)
        return orders.rows
    },
    async getOrderById (id) {
        const orders = await database.query(`
            SELECT orders.id, clocks.size AS size, 
            clocks.time_to_fix AS time, masters.name AS master, masters.id AS master_id, masters.rating AS rating, cities.name AS city,
            order_start_time AS start, order_end_time AS end 
            FROM orders 
            INNER JOIN customers ON customers_id = customers.id 
            INNER JOIN clocks ON clocks_id = clocks.id 
            INNER JOIN masters ON masters_id = masters.id 
            INNER JOIN cities ON orders.cities_id = cities.id 
            WHERE orders.id = $1`,[id])
        return orders.rows[0]
    },
    async editOrder (id,size,master,city,start,end) {
        const cities_id = await citiesModel.getCitiesId(city)
        const masters = await mastersModel.getMasterById(master)
        const masters_id = masters.master.id
        const clocks_id = await clocksModel.getClocksId(size)
        const start_order_date = dateString(start)
        const end_order_date = dateString(end)
        const editedMaster = await database.query('UPDATE orders set cities_id=$1, masters_id=$2, clocks_id=$3, order_start_time=$4, order_end_time = $5  where id = $6 RETURNING *', [cities_id,masters_id,clocks_id,start_order_date,end_order_date,id])
        return editedMaster.rows
    },
    async delOrder (id) {
        return await database.query("DELETE FROM orders WHERE id=$1",[id])
    }
}
