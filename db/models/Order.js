import { DataTypes, Sequelize } from 'sequelize'
import sequelize from '../database.js'

import { City } from './Сity.js'
import { Clock } from './Clock.js'
import { Master } from './Master.js'
import { Customer } from './Сustomer.js'

export const Statuses = { Confirmed: 'Confirmed', Completed: 'Completed', Canceled: 'Canceled' }

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM(Statuses.Confirmed, Statuses.Completed, Statuses.Canceled),
    defaultValue: Statuses.Confirmed
  }
})

Clock.hasMany(Order, { onDelete: 'RESTRICT' })
Order.belongsTo(Clock)

Customer.hasMany(Order, { onDelete: 'RESTRICT' })
Order.belongsTo(Customer)

Master.hasMany(Order, { onDelete: 'RESTRICT' })
Order.belongsTo(Master)

City.hasMany(Order, { onDelete: 'RESTRICT' })
Order.belongsTo(City)

export { Order }
