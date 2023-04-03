import { Customer } from '../db/models/Сustomer.js'

export default {
  getCustomers: async () => {
    const customers = await Customer.findAll({ order: [['id', 'DESC']] })
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
  getCustomerByName: async (name) => {
    const customer = await Customer.findOne({
      where: { name }
    })
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
