import { ZodError } from 'zod'
import {
  activateSchema,
  authSchema,
  customerRegistrationSchema,
  loginSchema,
  masterRegistrationSchema
} from '../validation/usersSchema.js'
import { usersService } from '../services/service.layer.js'
import CustomError from '../errors/customError.js'

export default {
  login: async (req, res) => {
    try {
      const body = req.body
      const { email, password } = loginSchema.parse(body)
      const userData = await usersService.login(email, password)
      return res.status(200).json(userData)
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
  auth: async (req, res) => {
    try {
      const user = req.user
      const { id, email, role, isEmailActivated } = authSchema.parse(user)
      const userData = await usersService.auth({ id, email, role, isEmailActivated })
      return res.status(200).json(userData)
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
  confirmEmail: async (req, res) => {
    try {
      const params = req.params
      const { activationLink } = activateSchema.parse(params)
      await usersService.confirmEmail(activationLink)
      return res.redirect(process.env.CLIENT_URL)
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
  masterRegistration: async (req, res) => {
    try {
      const body = req.body
      const { name, email, password, cities } = masterRegistrationSchema.parse(body)
      const newUserMaster = await usersService.masterRegistration(name, email, password, cities)
      return res.status(200).json(newUserMaster)
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
  customerRegistration: async (req, res) => {
    try {
      const body = req.body
      const { name, email, password } = customerRegistrationSchema.parse(body)
      const newUserCustomer = await usersService.customerRegistration(name, email, password)
      return res.status(200).json(newUserCustomer)
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
  masterRegistrationFromAdminPage: async (req, res) => {
    try {
      const body = req.body
      const { name, email, password, cities } = masterRegistrationSchema.parse(body)
      const newUserMaster = await usersService.masterRegistrationFromAdminPage(
        name,
        email,
        password,
        cities
      )
      return res.status(200).json(newUserMaster)
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
  customerRegistrationFromAdminPage: async (req, res) => {
    try {
      const body = req.body
      const { name, email, password } = customerRegistrationSchema.parse(body)
      const newUserCustomer = await usersService.customerRegistrationFromAdminPage(
        name,
        email,
        password
      )
      return res.status(200).json(newUserCustomer)
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
