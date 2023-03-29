import customersService from '../services/customers.service.js'
import {
  delCustomerSchema,
  editCustomerSchema,
  getCustomerByIdSchema
} from '../validation/customersSchema.js'

export default {
  getCustomers: async (req, res) => {
    try {
      const customers = await customersService.getCustomers()
      return res.status(200).json(customers)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  },
  getCustomerById: async (req, res) => {
    try {
      const params = req.params
      const { id } = getCustomerByIdSchema.parse(params)
      const customer = await customersService.getCustomerById(id)
      return res.status(200).json(customer)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  editCustomer: async (req, res) => {
    try {
      const body = req.body
      const params = req.params
      const { id, name, email } = editCustomerSchema.parse({ ...body, ...params })
      const editedCustomer = await customersService.editCustomer(id, name, email)
      return res.status(200).json(editedCustomer)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  delCustomer: async (req, res) => {
    try {
      const params = req.params
      const { id } = delCustomerSchema.parse(params)
      const delCustomerId = await customersService.delCustomer(id)
      return res.status(200).json(delCustomerId)
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  }
}
