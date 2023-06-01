import { DataTypes, Sequelize } from 'sequelize'
import sequelize from '../database.js'

import { City } from './Сity.js'
import { Clock } from './Clock.js'
import { Master } from './Master.js'
import { Customer } from './Сustomer.js'

export const Statuses = {
  Completed: 'Completed',
  Canceled: 'Canceled',
  AwaitPayment: 'Await Payment',
  PaymentSuccess: 'Payment Success'
}

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
  images: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
    defaultValue: []
  },
  transactionId: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM(
      Statuses.Completed,
      Statuses.Canceled,
      Statuses.AwaitPayment,
      Statuses.PaymentSuccess
    ),
    defaultValue: Statuses.AwaitPayment
  },
  rating: {
    type: DataTypes.INTEGER
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
