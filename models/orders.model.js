const database = require('../database')

module.exports = {
    async addOrder(customers_id,clocks_id,masters_id,cities_id,start,end){
        await database.query(`
            INSERT INTO orders (customers_id,clocks_id,masters_id,cities_id,order_start_time,order_end_time) 
            VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,[customers_id,clocks_id,masters_id,cities_id,start,end]
        )
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
        let orders = await database.query(`SELECT id, masters_id, cities_id,
            order_start_time AS start, order_end_time AS end
            FROM orders `)
        return orders.rows
    },
    async getOrderById (id) {
        let order = await database.query(`
            SELECT orders.id, clocks.size AS size, 
            clocks.time_to_fix AS time, masters.name AS master, masters.id AS master_id, masters.rating AS rating, cities.name AS city,
            order_start_time AS start, order_end_time AS end 
            FROM orders 
            INNER JOIN customers ON customers_id = customers.id 
            INNER JOIN clocks ON clocks_id = clocks.id 
            INNER JOIN masters ON masters_id = masters.id 
            INNER JOIN cities ON orders.cities_id = cities.id 
            WHERE orders.id = $1`,[id])
        return order.rows[0]
    },
    async editOrder (cities_id,masters_id,clocks_id,start_order_date,end_order_date,id) {
        const editedMaster = await database.query('UPDATE orders set cities_id=$1, masters_id=$2, clocks_id=$3, order_start_time=$4, order_end_time = $5  where id = $6 RETURNING *', [cities_id,masters_id,clocks_id,start_order_date,end_order_date,id])
        return editedMaster.rows
    },
    async delOrder (id) {
        return await database.query("DELETE FROM orders WHERE id=$1",[id])
    }
}
