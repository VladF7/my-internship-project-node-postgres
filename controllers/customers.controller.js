import { ZodError } from 'zod'
import CustomError from '../customError.js'
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
        console.log(error)
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        console.log(error.issues)
        return res.status(400).send(error.issues)
      } else {
        console.log(error)
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
        console.log(error)
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        console.log(error.issues)
        return res.status(400).send(error.issues)
      } else {
        console.log(error)
        return res.status(500).send(error)
      }
    }
  },
  delCustomer: async (req, res) => {
    try {
      const params = req.params
      const { id } = delCustomerSchema.parse(params)
      const delCustomerId = await customersService.delCustomer(id)
      return res.status(200).json(delCustomerId)
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error)
        return res.status(error.status).send({
          error: error.code,
          description: error.message
        })
      } else if (error instanceof ZodError) {
        console.log(error.issues)
        return res.status(400).send(error.issues)
      } else {
        console.log(error)
        return res.status(500).send(error)
      }
    }
  }
}
