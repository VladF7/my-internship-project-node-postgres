const database = require('../database')

module.exports = {
    async getCities () {
        const cities = await database.query("SELECT * FROM cities")      
        return cities.rows
    },
    async addCity (name){
        const newCity = await database.query('INSERT INTO cities (name) values ($1) RETURNING *', [name])
        return newCity.rows 
    },
    async delCity (id) {
        return await database.query('DELETE FROM cities WHERE id = $1',[id])
    },
    async getCitiesId (name) {
        const cities_id = await database.query('SELECT id FROM cities WHERE name = $1', [name])
        return cities_id.rows[0]
    },
    async getCityById (id){
        return await database.query('SELECT * FROM cities WHERE id = $1',[id])
    }
}

