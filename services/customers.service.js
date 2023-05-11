/* eslint-disable no-useless-catch */
import { CUSTOMER_IS_NOT_EXIST, USER_IS_NOT_EXIST } from '../errors/types.js'
import CustomError from '../errors/customError.js'
import { customersModel, usersModel } from '../models/model.layer.js'
import { generate } from 'generate-password'
import bcrypt from 'bcrypt'
import mailService from './mail.service.js'

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
      const userId = customer.userId
      const user = await usersModel.getUserById(userId)
      if (user) {
        const deletedCustomer = await customersModel.deleteCustomerAndUser(id, userId)
        if (!deletedCustomer) {
          throw new Error()
        }
      } else {
        const deletedCustomer = await customersModel.deleteCustomer(id)
        if (!deletedCustomer) {
          throw new Error()
        }
      }
      return id
    } catch (error) {
      throw error
    }
  },
  resetPassword: async (id) => {
    try {
      const customer = await customersModel.getCustomerById(id)
      if (!customer) {
        throw new CustomError(CUSTOMER_IS_NOT_EXIST, 400, `Customer with id ${id} is not exist`)
      }
      const userId = customer.userId
      const user = await usersModel.getUserById(userId)
      if (!user) {
        throw new CustomError(USER_IS_NOT_EXIST, 400, `User with id ${userId} is not exist`)
      }
      const newPassword = generate({ length: 10, numbers: true })
      const hashNewPassword = await bcrypt.hash(newPassword, 3)
      const resetedPassword = await usersModel.resetPassword(userId, hashNewPassword)
      const email = user.email
      await mailService.sendNewPasswordMail(email, newPassword)
      return resetedPassword
    } catch (error) {
      throw error
    }
  }
}
