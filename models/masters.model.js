const database = require('../database')
const citiesModel = require('./cities.model')

module.exports = {
    getMasters: async ()=>{
        const masters = await database.query("SELECT masters.id, masters.name, masters.rating, cities.name AS city FROM masters INNER JOIN cities ON cities.id = masters.cities_id") 
        return masters.rows
    },
    getMastersByCitiesId: async (cities_id)=>{
        const masters = await database.query("SELECT masters.id, masters.name, masters.rating, cities.name AS city FROM masters INNER JOIN cities ON cities.id = masters.cities_id WHERE cities.id = $1",[cities_id])
        return masters.rows
    },
    getMasterById: async (id)=>{
        const master = await database.query('SELECT masters.id, masters.name, masters.rating, cities.name AS city FROM masters INNER JOIN cities ON cities.id = masters.cities_id WHERE masters.id = $1',[id])
        return master.rows[0]
    }, 
    addMaster: async (name,rating,city)=>{
        const cities_id = await citiesModel.getCitiesId(city)
        let newMaster = await database.query('INSERT INTO masters (name,rating,cities_id) values ($1,$2,$3) RETURNING *', [name,rating,cities_id])
        return newMaster.rows
     },
     editMaster: async (id,name,rating,city)=>{
        const cities_id = await citiesModel.getCitiesId(city)
        const editedMaster = await database.query('UPDATE masters set name=$1, rating=$2, cities_id=$3 where id = $4 RETURNING *', [name,rating,cities_id,id])
        return editedMaster.rows
    },
    delMaster: async (id)=>{
        return await database.query('DELETE FROM masters WHERE id = $1',[id])
    }, 
}

