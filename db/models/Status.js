import { DataTypes } from 'sequelize'
import sequelize from '../database.js'

const Status = sequelize.define('status', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

export { Status }
