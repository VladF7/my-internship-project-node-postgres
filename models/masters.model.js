import database from '../database.js'

export default {
    async getMasters () {
        const masters = await database.query("SELECT id, name, rating FROM masters") 
        return masters.rows
    },
    async getCitiesForMaster () {
        const cities = await database.query(`SELECT "masterId", cities.name FROM "citiesMasters"
            JOIN cities ON cities.id = "citiesMasters"."cityId"`)
        return cities.rows
    },
    async getMastersByCitiesId (id) {
        const masters = await database.query(`SELECT masters.id, masters.name, masters.rating FROM masters
            JOIN "citiesMasters" ON masters.id = "citiesMasters"."masterId"
            WHERE "cityId" = $1`,[id])
        return masters.rows
    },
    async getMasterById (id) {
        const master = await database.query('SELECT id, name, rating FROM masters WHERE id = $1',[id])
        return master.rows[0]
    }, 
    async getCitiesByMasterId (id) {
        const cities = await database.query(`SELECT "cityId" AS id, cities.name FROM "citiesMasters"  
            JOIN cities ON cities.id = "citiesMasters"."cityId" 
            WHERE "masterId" = $1`,[id])
        return cities.rows
    }, 
    async addMaster (name,rating) {
        const newMaster = await database.query('INSERT INTO masters (name,rating) VALUES ($1,$2) RETURNING id', [name,rating])
        return newMaster.rows[0].id
     },

     async editMaster (id,name,rating) {
        const editedMaster = await database.query('UPDATE masters SET name=$1, rating=$2 WHERE id = $3 RETURNING *', [name,rating,id])   
        return editedMaster.rows[0]
    },
    async addCitiesForMaster (cities, id) {
        for (let i = 0; i < cities.length; i++) {
            await database.query('INSERT INTO "citiesMasters" VALUES ($1,$2) RETURNING *', [cities[i], id])
        }
    },
    async delCitiesForMaster (id) {
        return await database.query('DELETE FROM "citiesMasters" WHERE "masterId" =$1 ',[id])
    },
    async isMasterBusy (id) {
        const masterIdInOrders = await database.query('SELECT id FROM orders WHERE "masterId" = $1',[id])
        return masterIdInOrders.rows[0]
    },
    async delMaster (id) {
            return await database.query('DELETE FROM masters WHERE id = $1 RETURNING id',[id])
    }, 
}

