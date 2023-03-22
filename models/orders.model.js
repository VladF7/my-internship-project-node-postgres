import database from '../database.js'

export default {
    addOrder: async (customerId,clockId,masterId,cityId,startTime,endTime) => {
        const order = await database.query(`
            INSERT INTO orders ("customerId","clockId","masterId","cityId","startTime","endTime") 
            VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,[customerId,clockId,masterId,cityId,startTime,endTime]
        )
        return order.rows[0]
    },
    getOrders: async () => {
        const orders = await database.query(`
            SELECT orders.id, customers.name, customers.email, clocks.size, 
            clocks."timeToFix", masters.name AS master, cities.name AS city,
            "startTime", "endTime"
            FROM orders 
            INNER JOIN customers ON "customerId" = customers.id 
            INNER JOIN clocks ON "clockId" = clocks.id 
            INNER JOIN masters ON "masterId" = masters.id 
            INNER JOIN cities ON "cityId" = cities.id
            ORDER BY id DESC`)
        return orders.rows
    },
    getOrdersList: async () => {
        const orders = await database.query(`SELECT id, "masterId", "cityId",
            "startTime", "endTime"
            FROM orders `)
        return orders.rows
    },
    getOrderById: async (id) => {
        const order = await database.query(`
            SELECT orders.id, clocks.size AS size, 
            clocks."timeToFix", masters.name AS master, masters.id AS "masterId", masters.rating AS rating, cities.name AS city,
            "startTime", "endTime"
            FROM orders 
            INNER JOIN customers ON "customerId" = customers.id 
            INNER JOIN clocks ON "clockId" = clocks.id 
            INNER JOIN masters ON "masterId" = masters.id 
            INNER JOIN cities ON "cityId" = cities.id 
            WHERE orders.id = $1`,[id])
        return order.rows[0]
    },
    editOrder: async (cityId,masterId,clockId,startTime,endTime,id) => {
        const editedMaster = await database.query('UPDATE orders SET "cityId"=$1, "masterId"=$2, "clockId"=$3, "startTime"=$4, "endTime" = $5  WHERE id = $6 RETURNING *', [cityId,masterId,clockId,startTime,endTime,id])
        return editedMaster.rows
    },
    delOrder: async (id) => {
        return await database.query("DELETE FROM orders WHERE id=$1",[id])
    }
}
