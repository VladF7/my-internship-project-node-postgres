import { DataTypes } from 'sequelize'
import sequelize from '../database.js'

const Master = sequelize.define('master', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

export { Master }
