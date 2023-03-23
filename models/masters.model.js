import database from '../database.js'

export default {
  getMasters: async () => {
    const masters = await database.query('SELECT id, name, rating FROM masters')
    return masters.rows
  },
  getCitiesForMaster: async () => {
    const cities = await database.query(`SELECT "masterId", cities.name FROM "citiesMasters"
            JOIN cities ON cities.id = "citiesMasters"."cityId"`)
    return cities.rows
  },
  getMastersByCitiesId: async (id) => {
    const masters = await database.query(
      `SELECT masters.id, masters.name, masters.rating FROM masters
            JOIN "citiesMasters" ON masters.id = "citiesMasters"."masterId"
            WHERE "cityId" = $1`,
      [id]
    )
    return masters.rows
  },
  getMasterById: async (id) => {
    const master = await database.query('SELECT id, name, rating FROM masters WHERE id = $1', [id])
    return master.rows[0]
  },
  getCitiesByMasterId: async (id) => {
    const cities = await database.query(
      `SELECT "cityId" AS id, cities.name FROM "citiesMasters"  
            JOIN cities ON cities.id = "citiesMasters"."cityId" 
            WHERE "masterId" = $1`,
      [id]
    )
    return cities.rows
  },
  addMaster: async (name, rating) => {
    const newMaster = await database.query(
      'INSERT INTO masters (name,rating) VALUES ($1,$2) RETURNING id',
      [name, rating]
    )
    return newMaster.rows[0].id
  },

  editMaster: async (id, name, rating) => {
    const editedMaster = await database.query(
      'UPDATE masters SET name=$1, rating=$2 WHERE id = $3 RETURNING *',
      [name, rating, id]
    )
    return editedMaster.rows[0]
  },
  addCitiesForMaster: async (cities, id) => {
    for (let i = 0; i < cities.length; i++) {
      await database.query('INSERT INTO "citiesMasters" VALUES ($1,$2) RETURNING *', [
        cities[i],
        id
      ])
    }
  },
  delCitiesForMaster: async (id) => {
    return await database.query('DELETE FROM "citiesMasters" WHERE "masterId" =$1 ', [id])
  },
  isMasterBusy: async (id) => {
    const masterIdInOrders = await database.query('SELECT id FROM orders WHERE "masterId" = $1', [
      id
    ])
    return masterIdInOrders.rows[0]
  },
  delMaster: async (id) => {
    return await database.query('DELETE FROM masters WHERE id = $1 RETURNING id', [id])
  }
}
