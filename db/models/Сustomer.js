import { DataTypes } from 'sequelize'
import sequelize from '../database.js'
import { User } from './User.js'

const Customer = sequelize.define('customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})
User.hasOne(Customer, { onDelete: 'RESTRICT' })
Customer.belongsTo(User)

export { Customer }
