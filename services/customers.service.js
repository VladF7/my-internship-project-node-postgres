import CustomError from '../customError.js'
import customersModel from '../models/customers.model.js'

export default {
  getCustomers: async () => {
    try {
      const customers = await customersModel.getCustomers()
      return customers
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  getCustomerById: async (customerId) => {
    try {
      const customer = await customersModel.getCustomerById(customerId)
      if (!customer) {
        throw new CustomError(
          'CUSTOMER_IS_NOT_EXIST',
          404,
          `Customer with id ${customerId} is not exist`
        )
      }
      return customer
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  editCustomer: async (customerId, name, email) => {
    try {
      const customer = await customersModel.getCustomerById(customerId)
      if (!customer) {
        throw new CustomError(
          'CUSTOMER_IS_NOT_EXIST',
          404,
          `Customer with id ${customerId} is not exist`
        )
      }
      const editedCustomer = await customersModel.editCustomer(customerId, name, email)
      return editedCustomer
    } catch (error) {
      console.log(error.message)
      throw error
    }
  },
  delCustomer: async (customerId) => {
    try {
      const customer = await customersModel.getCustomerById(customerId)
      if (!customer) {
        throw new CustomError(
          'CUSTOMER_IS_NOT_EXIST',
          404,
          `Customer with id ${customerId} is not exist`
        )
      }
      const delCustomer = await customersModel.delCustomer(customerId)
      return delCustomer
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
}
