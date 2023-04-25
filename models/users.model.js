import sequelize from '../db/database.js'
import { CityMaster } from '../db/models/CityMaster.js'
import { Clock } from '../db/models/Clock.js'
import { Master } from '../db/models/Master.js'
import { Order } from '../db/models/Order.js'
import { User } from '../db/models/User.js'
import { City } from '../db/models/Сity.js'
import { Customer } from '../db/models/Сustomer.js'

export default {
  getUserByEmail: async (email) => {
    const user = await User.findOne({
      where: { email }
    })
    return user
  },
  getUserById: async (id) => {
    const user = await User.findByPk(id)
    return user
  },
  getUserEmailById: async (id) => {
    const user = await User.findByPk(id)
    return user.dataValues.email
  },
  getUserByActivationLink: async (activationLink) => {
    const user = await User.findOne({
      where: { activationLink }
    })
    return user
  },
  createUserAndMaster: async (
    name,
    email,
    password,
    role,
    cities,
    activationLink,
    isEmailActivated
  ) => {
    const transaction = await sequelize.transaction()
    try {
      const newUser = await User.create(
        { email, password, activationLink, role, isEmailActivated },
        { transaction }
      )
      const userId = newUser.dataValues.id
      const newMaster = await Master.create({ userId, name }, { transaction })
      const masterId = newMaster.dataValues.id
      await CityMaster.bulkCreate(
        cities.map((cityId) => ({ cityId, masterId })),
        { transaction }
      )
      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  createUserAndCreateCustomer: async (name, email, password, activationLink, isEmailActivated) => {
    const transaction = await sequelize.transaction()
    try {
      const newUser = await User.create(
        { email, password, activationLink, isEmailActivated },
        { transaction }
      )
      const userId = newUser.dataValues.id
      await Customer.create({ userId, name, email }, { transaction })

      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  createUserAndUpdateCustomer: async (name, email, password, activationLink, isEmailActivated) => {
    const transaction = await sequelize.transaction()
    try {
      const newUser = await User.create(
        { email, password, activationLink, isEmailActivated },
        { transaction }
      )
      const userId = newUser.dataValues.id
      await Customer.update({ name, userId }, { where: { email }, transaction })

      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  resetPassword: async (id, password) => {
    const resetedPassword = await User.update({ password }, { where: { id } })
    return resetedPassword
  },
  getOrdersForMasterByUserId: async (id) => {
    const master = await Master.findOne({ where: { userId: id } })
    const masterId = master.dataValues.id
    const orders = await Order.findAll({
      where: {
        masterId
      },

      include: [Customer, Clock, City],
      order: [['startTime', 'DESC']]
    })

    return orders
  },
  getOrdersForCustomerByUserId: async (id) => {
    const customer = await Customer.findOne({ where: { userId: id } })
    const customerId = customer.dataValues.id
    const orders = await Order.findAll({
      where: {
        customerId
      },

      include: [Master, Clock, City],
      order: [['startTime', 'DESC']]
    })

    return orders
  }
}
