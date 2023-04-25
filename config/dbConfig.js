import sequelize from '../db/database.js'
/* eslint-disable */
import * as models from '../db/models/models.DALayer.js'

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export default connectDB
