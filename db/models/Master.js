import { DataTypes } from 'sequelize'
import sequelize from '../database.js'
import { User } from './User.js'

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
    defaultValue: 5,
    allowNull: false
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})
User.hasOne(Master, { onDelete: 'RESTRICT' })
Master.belongsTo(User)

export { Master }
