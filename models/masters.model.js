const database = require('../database')

module.exports = {
    async getMasters () {
        const masters = await database.query("SELECT masters.id, masters.name, masters.rating FROM masters") 
        return masters.rows
    },
    async getCitiesForMaster () {
        const cities = await database.query(`SELECT masters_id, cities.name FROM cities_masters
            JOIN cities on cities.id = cities_masters.cities_id`)
        return cities.rows
    },
    async getMastersByCitiesId (id) {
        const masters = await database.query(`SELECT masters.id, masters.name, masters.rating FROM masters
            JOIN cities_masters on masters.id = cities_masters.masters_id
            WHERE cities_id = $1`,[id])
        return masters.rows
    },
    async getMasterById (id) {
        const master = await database.query('SELECT masters.id, masters.name, masters.rating FROM masters WHERE masters.id = $1',[id])
        return master.rows[0]
    }, 
    async getCitiesByMasterId (id) {
        const cities = await database.query(`SELECT cities_id AS id, cities.name FROM cities_masters  
            JOIN cities on cities.id = cities_masters.cities_id 
            WHERE masters_id = $1`,[id])
        return cities.rows
    }, 
    async addMaster (name,rating) {
        const new_master = await database.query('INSERT INTO masters (name,rating) VALUES ($1,$2) RETURNING id', [name,rating])
        return new_master.rows[0].id
     },

     async editMaster (id,name,rating) {
        const editedMaster = await database.query('UPDATE masters set name=$1, rating=$2 where id = $3 RETURNING *', [name,rating,id])   
        return editedMaster.rows[0]
    },
    async addCitiesForMaster (cities, id) {
        for (let i = 0; i < cities.length; i++) {
            await database.query('INSERT INTO cities_masters VALUES ($1,$2) RETURNING *', [cities[i], id])
        }
    },
    async delCitiesForMaster (id) {
        return await database.query('DELETE FROM cities_masters WHERE masters_id =$1 ',[id])
    },
    async isMasterBusy (id) {
        const masterIdInOrders = await database.query('SELECT id FROM orders WHERE masters_id = $1',[id])
        return masterIdInOrders.rows[0]
    },
    async delMaster (id) {
            return await database.query('DELETE FROM masters WHERE id = $1 RETURNING id',[id])
    }, 
}

