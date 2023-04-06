/* eslint-disable no-useless-catch */
import CustomError from '../errors/customError.js'
import { CUSTOMER_IS_NOT_EXIST } from '../errors/types.js'
import customersModel from '../models/customers.model.js'

export default {
  getCustomers: async () => {
    try {
      const customers = await customersModel.getCustomers()
      return customers
    } catch (error) {
      throw error
    }
  },
  getCustomerById: async (id) => {
    try {
      const customer = await customersModel.getCustomerById(id)
      if (!customer) {
        throw new CustomError(CUSTOMER_IS_NOT_EXIST, 404, `Customer with id ${id} is not exist`)
      }
      return customer
    } catch (error) {
      throw error
    }
  },
  editCustomer: async (id, name, email) => {
    try {
      const customer = await customersModel.getCustomerById(id)
      if (!customer) {
        throw new CustomError(CUSTOMER_IS_NOT_EXIST, 400, `Customer with id ${id} is not exist`)
      }
      const editedCustomer = await customersModel.editCustomer(id, name, email)
      return editedCustomer
    } catch (error) {
      throw error
    }
  },
  deleteCustomer: async (id) => {
    try {
      const customer = await customersModel.getCustomerById(id)
      if (!customer) {
        throw new CustomError(CUSTOMER_IS_NOT_EXIST, 400, `Customer with id ${id} is not exist`)
      }
      const deletedCustomer = await customersModel.deleteCustomer(id)
      return deletedCustomer
    } catch (error) {
      throw error
    }
  }
}
