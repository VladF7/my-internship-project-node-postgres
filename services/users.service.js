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
import { citiesModel, customersModel, usersModel } from '../models/model.layer.js'

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
      const generateTokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        isEmailActivated: user.isEmailActivated
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
      user.isEmailActivated = true
      await user.save()
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
      await mailService.sendActivationMailForMaster(
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
      await mailService.sendActivationMail(
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
  }
}
