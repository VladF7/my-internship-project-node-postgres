import customersModel from '../models/customers.model.js'

export default {
  addCustomer: async (name, email) => {
    return await customersModel.addCustomer(name, email)
  },
  getCustomerId: async (email) => {
    try {
      return await customersModel.getCustomerId(email)
    } catch (error) {
      return undefined
    }
  },
  getCustomers: async () => {
    return await customersModel.getCustomers()
  },
  getCustomerById: async (id) => {
    return await customersModel.getCustomerById(id)
  },
  editCustomer: async (id, name, email) => {
    return await customersModel.editCustomer(id, name, email)
  },
  delCustomer: async (id) => {
    try {
      return await customersModel.delCustomer(id)
    } catch (error) {
      return undefined
    }
  }
}
