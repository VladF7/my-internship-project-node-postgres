/* eslint-disable no-useless-catch */
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import mailService from '../services/mail.service.js'
import CustomError from '../errors/customError.js'
import {
  CITY_IS_NOT_EXIST,
  INCORRECT_ACTIVATION_LINK,
  INVALID_DATA,
  USER_IS_EXIST
} from '../errors/types.js'
import { Roles } from '../db/models/User.js'
import { citiesModel, customersModel, usersModel, mastersModel } from '../models/model.layer.js'
import { generate } from 'generate-password'

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' })
}

export default {
  login: async (email, password) => {
    try {
      const user = await usersModel.getUserByEmail(email)
      const userPassword = user.password
      const validPassword = await bcrypt.compareSync(password, userPassword)
      if (!user || !validPassword) {
        throw new CustomError(INVALID_DATA, 400, `Wrong email or password`)
      }
      let generateTokenPayload
      if (user.role === Roles.Customer) {
        const customer = await customersModel.getCustomerByUserId(user.id)
        generateTokenPayload = {
          id: user.id,
          customerId: customer.id,
          name: customer.name,
          email: user.email,
          role: user.role,
          isEmailActivated: user.isEmailActivated
        }
        if (!user.isEmailActivated) {
          return {
            message: 'This user is not confirm email',
            redirect: true,
            redirectTo: 'confirmEmail'
          }
        }
      }
      if (user.role === Roles.Master) {
        const master = await mastersModel.getMasterByUserId(user.id)
        generateTokenPayload = {
          id: user.id,
          masterId: master.id,
          name: master.name,
          email: user.email,
          role: user.role,
          isActivated: master.isActivated,
          isEmailActivated: user.isEmailActivated
        }
        if (!user.isEmailActivated) {
          return {
            message: 'This user is not confirm email',
            redirect: true,
            redirectTo: 'confirmEmail'
          }
        }
        if (!master.isActivated) {
          return {
            message: 'This user is not activated by admin',
            redirect: true,
            redirectTo: 'awaitApprove'
          }
        }
      }
      if (user.role === Roles.Admin) {
        generateTokenPayload = {
          id: user.id,
          email: user.email,
          role: user.role,
          isEmailActivated: user.isEmailActivated
        }
      }
      const token = generateAccessToken(generateTokenPayload)
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return { token, user: userData }
    } catch (error) {
      throw error
    }
  },
  auth: async (userData) => {
    try {
      return { user: userData }
    } catch (error) {
      throw error
    }
  },
  confirmEmail: async (activationLink) => {
    try {
      const user = await usersModel.getUserByActivationLink(activationLink)
      if (!user) {
        throw new CustomError(INCORRECT_ACTIVATION_LINK, 404, `Incorrect activation link`)
      }
      if (user.isEmailActivated) {
        return `${process.env.CLIENT_URL}/user/emailConfirmed`
      }
      user.isEmailActivated = true
      await user.save()
      return process.env.CLIENT_URL
    } catch (error) {
      throw error
    }
  },
  masterRegistration: async (name, email, password, cities) => {
    try {
      const existUser = await usersModel.getUserByEmail(email)
      if (existUser) {
        throw new CustomError(USER_IS_EXIST, 405, `User with email ${email} is alredy exist`)
      }
      const isCitiesExist = await citiesModel.isCitiesExist(cities)
      if (!isCitiesExist) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `Cities for master can't be created`)
      }

      const hashPassword = await bcrypt.hash(password, 3)
      const activationLink = v4()
      const role = Roles.Master
      const newUserMaster = await usersModel.createUserAndMaster(
        name,
        email,
        hashPassword,
        role,
        cities,
        activationLink
      )
      await mailService.sendConfirmMailForMaster(
        email,
        `${process.env.API_URL}/api/confirmEmail/${activationLink}`
      )
      return newUserMaster
    } catch (error) {
      throw error
    }
  },
  customerRegistration: async (name, email, password) => {
    try {
      const existUser = await usersModel.getUserByEmail(email)
      if (existUser) {
        throw new CustomError(USER_IS_EXIST, 405, `User with email ${email} is alredy exist`)
      }
      const hashPassword = await bcrypt.hash(password, 3)
      const activationLink = v4()
      let newUserCustomer
      const isCustomerExist = await customersModel.getCustomerByEmail(email)
      if (isCustomerExist) {
        newUserCustomer = await usersModel.createUserAndUpdateCustomer(
          name,
          email,
          hashPassword,
          activationLink
        )
      } else {
        newUserCustomer = await usersModel.createUserAndCreateCustomer(
          name,
          email,
          hashPassword,
          activationLink
        )
      }
      await mailService.sendConfirmMail(
        email,
        `${process.env.API_URL}/api/confirmEmail/${activationLink}`
      )
      return newUserCustomer
    } catch (error) {
      throw error
    }
  },
  masterRegistrationFromAdminPage: async (name, email, password, cities) => {
    try {
      const existUser = await usersModel.getUserByEmail(email)
      if (existUser) {
        throw new CustomError(USER_IS_EXIST, 405, `User with email ${email} is alredy exist`)
      }
      const isCitiesExist = await citiesModel.isCitiesExist(cities)
      if (!isCitiesExist) {
        throw new CustomError(CITY_IS_NOT_EXIST, 400, `Cities for master can't be created`)
      }
      const hashPassword = await bcrypt.hash(password, 3)
      const role = Roles.Master
      const isEmailActivated = true
      const activationLink = null
      const newUserMaster = await usersModel.createUserAndMaster(
        name,
        email,
        hashPassword,
        role,
        cities,
        activationLink,
        isEmailActivated
      )

      return newUserMaster
    } catch (error) {
      throw error
    }
  },
  customerRegistrationFromAdminPage: async (name, email, password) => {
    try {
      const existUser = await usersModel.getUserByEmail(email)
      if (existUser) {
        throw new CustomError(USER_IS_EXIST, 405, `User with email ${email} is alredy exist`)
      }
      const hashPassword = await bcrypt.hash(password, 3)
      const activationLink = null
      const isEmailActivated = true
      let newUserCustomer
      const isCustomerExist = await customersModel.getCustomerByEmail(email)
      if (isCustomerExist) {
        newUserCustomer = await usersModel.createUserAndUpdateCustomer(
          name,
          email,
          hashPassword,
          activationLink,
          isEmailActivated
        )
      } else {
        newUserCustomer = await usersModel.createUserAndCreateCustomer(
          name,
          email,
          hashPassword,
          activationLink,
          isEmailActivated
        )
      }

      return newUserCustomer
    } catch (error) {
      throw error
    }
  },
  getUserByEmail: async (email) => {
    try {
      const user = await usersModel.getUserByEmail(email)
      if (!user) {
        return null
      }
      const userData = {
        email: user.email,
        id: user.id,
        role: user.role,
        isEmailActivated: user.isEmailActivated
      }
      return userData
    } catch (error) {
      throw error
    }
  },
  createUserCustomer: async (email, name) => {
    try {
      const existUser = await usersModel.getUserByEmail(email)
      if (existUser) {
        throw new CustomError(USER_IS_EXIST, 405, `User with email ${email} is alredy exist`)
      }
      const password = generate({ length: 10, numbers: true })
      const hashPassword = await bcrypt.hash(password, 3)
      const activationLink = v4()

      const newUserCustomer = await usersModel.createUserAndCreateCustomer(
        name,
        email,
        hashPassword,
        activationLink
      )
      await mailService.sendNewUserCustomerDataMail(
        email,
        password,
        `${process.env.API_URL}/api/confirmEmail/${activationLink}`
      )
      return newUserCustomer
    } catch (error) {
      throw error
    }
  }
}
