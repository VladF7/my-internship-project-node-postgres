/* eslint-disable no-useless-catch */
import sequelize from '../db/database.js'
import { User, Customer } from '../db/models/models.DALayer.js'

export default {
  getCustomers: async () => {
    const customers = await Customer.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          attributes: ['isEmailActivated'],
          model: User
        }
      ]
    })
    return customers
  },
  getCustomerById: async (id) => {
    const customer = await Customer.findByPk(id)
    return customer
  },
  getCustomerByEmail: async (email) => {
    const customer = await Customer.findOne({
      where: { email }
    })
    return customer
  },
  editCustomer: async (id, name, email) => {
    const editedCustomer = await Customer.update({ name, email }, { where: { id } })
    return editedCustomer
  },
  deleteCustomer: async (id) => {
    const deletedCustomer = await Customer.destroy({ where: { id } })
    return deletedCustomer
  },
  deleteCustomerAndUser: async (id, userId) => {
    const transaction = await sequelize.transaction()
    try {
      const deletedCustomer = await Customer.destroy({ where: { id }, transaction })
      await User.destroy({ where: { id: userId }, transaction })
      await transaction.commit()
      return deletedCustomer
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  getCustomerByUserId: async (userId) => {
    const customer = await Customer.findOne({ where: { userId } })
    return customer
  }
}
