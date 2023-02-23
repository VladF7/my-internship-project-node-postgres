const database = require('../database')

module.exports = {
    async getCities () {
        const cities = await database.query("SELECT * FROM cities")      
        return cities.rows
    },
    async addCity (name){
        const cities_id = await this.getCitiesId(name)
        if(cities_id){
            return undefined
        } else {
            const newCity = await database.query('INSERT INTO cities (name) values ($1) RETURNING *', [name])
            return newCity.rows
        }   
    },
    async delCity (id) {
        try {
            return await database.query('DELETE FROM cities WHERE id = $1',[id])
        } catch (error) {
            return undefined
        }
    },
    async getCitiesId (name) {
        try {
            const cities_id = await database.query('SELECT id FROM cities WHERE name = $1', [name])
            return cities_id.rows[0].id
        } catch (error) {
            return undefined
        }  
    },
    async getCityById (id){
        return await database.query('SELECT * FROM cities WHERE id = $1',[id])
    }
}

