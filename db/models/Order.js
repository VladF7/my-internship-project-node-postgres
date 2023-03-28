import { DataTypes } from 'sequelize'
import sequelize from '../database.js'

import { City } from './Сity.js'
import { Clock } from './Clock.js'
import { Master } from './Master.js'
import { Customer } from './Сustomer.js'

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
