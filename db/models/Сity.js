import { DataTypes } from 'sequelize'
import sequelize from '../database.js'

const City = sequelize.define('city', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  priceForHour: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

export { City }
