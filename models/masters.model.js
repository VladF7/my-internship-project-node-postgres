const database = require('../database')
const citiesModel = require('./cities.model')

module.exports = {
    async getMasters () {
        const res = {}
        let masters = await database.query("SELECT masters.id, masters.name, masters.rating FROM masters") 
        let cities = await database.query(`SELECT masters_id, cities.name FROM cities_masters
            JOIN cities on cities.id = cities_masters.cities_id`)
            res.masters = masters.rows
            res.cities = cities.rows
        return res
    },
    async getMastersByCitiesId (cities_id) {
        const masters = await database.query(`SELECT masters.id, masters.name, masters.rating FROM masters
            JOIN cities_masters on masters.id = cities_masters.masters_id
            WHERE cities_id = $1`,[cities_id])
        return masters.rows
    },
    async getMasterById (id) {
        const res = {}
        const master = await database.query('SELECT masters.id, masters.name, masters.rating FROM masters WHERE masters.id = $1',[id])
        const cities = await database.query(`SELECT cities_id AS id, cities.name FROM cities_masters  
            JOIN cities on cities.id = cities_masters.cities_id 
            WHERE masters_id = $1`,[id])
            res.master = master.rows[0]
            res.cities = cities.rows
        return res
    }, 
    async addMaster (name,rating,cities) {
        const newMaster = await database.query('INSERT INTO masters (name,rating) VALUES ($1,$2) RETURNING id', [name,rating])
        await this.insertCitiesForMaster(cities, newMaster.rows[0].id)
        return newMaster
     },
    async editMaster (id,name,rating,cities) {
        const editedMaster = await database.query('UPDATE masters set name=$1, rating=$2 where id = $3 RETURNING *', [name,rating,id])   
            await this.delCitiesForMaster(id)
            await this.insertCitiesForMaster(cities, id)
            return editedMaster.rows
    },
    async delMaster (id) {
        const masterIdInOrders = await database.query('SELECT id FROM orders WHERE masters_id = $1',[id])
        if(masterIdInOrders.rows[0]){
            return undefined
        } else {
            await this.delCitiesForMaster(id)
            return await database.query('DELETE FROM masters WHERE id = $1 RETURNING id',[id])
        }
    }, 
    async delCitiesForMaster (id) {
        return await database.query('DELETE FROM cities_masters WHERE masters_id =$1',[id])
    },
    async insertCitiesForMaster (cities, id) {
        for (let i = 0; i < cities.length; i++) {
            await database.query('INSERT INTO cities_masters VALUES ($1,$2) RETURNING *', [cities[i],id])
        }
    }
}

