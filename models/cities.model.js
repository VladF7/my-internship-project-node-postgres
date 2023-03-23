import database from '../database.js'

export default {
  getCities: async () => {
    const cities = await database.query('SELECT * FROM cities')
    return cities.rows
  },
  addCity: async (name) => {
    const newCity = await database.query('INSERT INTO cities (name) VALUES ($1) RETURNING *', [
      name
    ])
    return newCity.rows
  },
  delCity: async (id) => {
    return await database.query('DELETE FROM cities WHERE id = $1', [id])
  },
  getCitiesId: async (name) => {
    const citiesId = await database.query('SELECT id FROM cities WHERE name = $1', [name])
    return citiesId.rows[0]
  },
  getCityById: async (id) => {
    return await database.query('SELECT * FROM cities WHERE id = $1', [id])
  }
}
