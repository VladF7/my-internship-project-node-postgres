import { DataTypes } from 'sequelize'
import sequelize from '../database.js'

const Clock = sequelize.define('clock', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timeToFix: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

export { Clock }
