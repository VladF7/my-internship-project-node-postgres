import { DataTypes } from 'sequelize'
import sequelize from '../database.js'

export const Roles = { Admin: 'Admin', Customer: 'Customer', Master: 'Master' }

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  isEmailActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  activationLink: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.ENUM(Roles.Admin, Roles.Customer, Roles.Master),
    defaultValue: Roles.Customer,
    allowNull: false
  }
})

export { User }
