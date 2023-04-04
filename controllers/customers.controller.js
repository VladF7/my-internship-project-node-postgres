import { ZodError } from 'zod'
import CustomError from '../errors/customError.js'
import customersService from '../services/customers.service.js'
import {
  deleteCustomerSchema,
  editCustomerSchema,
  getCustomerByIdSchema
} from '../validation/customersSchema.js'

export default {
  getCustomers: async (req, res) => {
    try {
      const customers = await customersService.getCustomers()
      return res.status(200).json(customers)
    } catch (error) {
      return res.status(500).send(error)
    }
  },
  getCustomerById: async (req, res) => {
    try {
      const params = req.params
      const { id } = getCustomerByIdSchema.parse(params)
      const customer = await customersService.getCustomerById(id)
      return res.status(200).json(customer)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send(error)
      }
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
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send(error)
      }
    }
  },
  deleteCustomer: async (req, res) => {
    try {
      const params = req.params
      const { id } = deleteCustomerSchema.parse(params)
      const deletedCustomer = await customersService.deleteCustomer(id)
      return res.status(200).json(deletedCustomer)
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error)
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send(error)
      }
    }
  }
}
