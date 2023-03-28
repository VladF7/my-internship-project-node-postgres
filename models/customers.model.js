import { Customer } from '../db/models/Сustomer.js'

export default {
  addCustomer: async (name, email) => {
    const newCustomer = await Customer.create({ name, email })
    return newCustomer
  },
  getCustomerId: async (email) => {
    const customerId = await Customer.findOne({
      attributes: ['id'],
      where: { email }
    })
    return customerId.dataValues.id
  },
  getCustomers: async () => {
    const customers = await Customer.findAll({ order: [['id', 'DESC']] })
    return customers
  },
  getCustomerById: async (id) => {
    const customer = await Customer.findByPk(id)
    return customer
  },
  editCustomer: async (id, name, email) => {
    const editedCustomer = await Customer.update({ name, email }, { where: { id } })
    return editedCustomer
  },
  delCustomer: async (id) => {
    return await Customer.destroy({ where: { id } })
  }
}
