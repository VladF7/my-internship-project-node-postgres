const database = require('../database')

module.exports = {
    getCities: async ()=>{
        const cities = await database.query("SELECT * FROM cities")      
        return cities.rows
    },
    addCity: async (name)=>{
        const newCity = await database.query('INSERT INTO cities (name) values ($1) RETURNING *', [name])
        return newCity.rows
    },
    delCity: async (id)=>{
        return await database.query('DELETE FROM cities WHERE id = $1',[id])
    },
    getCitiesId: async (city) =>{
        const cities_id = await database.query('SELECT id FROM cities WHERE name = $1', [city])
        return cities_id.rows[0].id
    } 
}

