import { ZodError } from 'zod'
import CustomError from '../errors/customError.js'
import customersService from '../services/customers.service.js'
import {
  deleteCustomerSchema,
  editCustomerSchema,
  getCustomerByIdSchema,
  resetPasswordSchema
} from '../validation/customersSchema.js'

export default {
  getCustomers: async (req, res) => {
    try {
      const customers = await customersService.getCustomers()
      return res.status(200).json(customers)
    } catch (error) {
      return res.status(500).send('Something went wrong')
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
        return res.status(500).send('Something went wrong')
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
        return res.status(500).send('Something went wrong')
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
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },
  resetPassword: async (req, res) => {
    try {
      const params = req.params
      const { id } = resetPasswordSchema.parse(params)
      const resetedPassword = await customersService.resetPassword(id)
      return res.status(200).json(resetedPassword)
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  }
}
