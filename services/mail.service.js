/* eslint-disable no-useless-catch */
import nodemailer from 'nodemailer'
import { getDate, getTime } from '../date.js'
import { mastersModel, citiesModel, clocksModel } from '../models/model.layer.js'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})

export default {
  sendSuccessOrderMail: async (email, name, cityId, clockId, masterId, start, end) => {
    try {
      const city = await citiesModel.getCityById(cityId)
      const clock = await clocksModel.getClockById(clockId)
      const master = await mastersModel.getMasterById(masterId)

      const masterName = master.name
      const timeToFix = clock.timeToFix
      const size = clock.size
      const cityName = city.name

      const date = getDate(start)
      const startTime = getTime(start)
      const endTime = getTime(end)

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `${process.env.COMPANY_NAME}`,
        text: '',
        html: `
                <h1>You have successfully placed an order on the site ${process.env.CLIENT_URL}</h1>
                <div>
                    <div>
                        Hello, ${name}, you placed an order for clock repair, in the city of ${cityName} on ${date}.
                    </div>
                    <div>
                        Clock size - ${size}, time to fix - ${timeToFix} hour/s.
                    </div>
                    <div>
                        The master whose name is ${masterName}, will be from ${startTime} to ${endTime}.
                    </div>
                </div>
              `
      })
    } catch (error) {
      throw error
    }
  },
  sendConfirmMail: async (email, link) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Confirm email on the ${process.env.COMPANY_NAME}`,
        text: '',
        html: `
                <div>
                <h1>For confirm email on the ${process.env.COMPANY_NAME} follow the link</h1>
                <a target="_blank" href=${link}>${link}</a>
                </div>
              `
      })
    } catch (error) {
      throw error
    }
  },
  sendConfirmMailForMaster: async (email, link) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Confirm email on the ${process.env.COMPANY_NAME}`,
        text: '',
        html: `
                <div>
                <h1>For confirm email on the ${process.env.COMPANY_NAME} follow the link</h1>
                <a target="_blank" href=${link}>${link}</a>
                <div>Before login you need also await for approve from admin</div>
                </div>
              `
      })
    } catch (error) {
      throw error
    }
  },
  sendNewPasswordMail: async (email, password) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Reset password on the ${process.env.COMPANY_NAME}`,
        text: '',
        html: `
                <div>
                <h1>Your password on the ${process.env.COMPANY_NAME} has been reset</h1>
                <div>Your email: ${email}</div>
                <div>New password: ${password}</div>
                <div>Follow the link <a target="_blank" href=${process.env.CLIENT_URL}/auth>${process.env.CLIENT_URL}</a></div>
                </div>
              `
      })
    } catch (error) {
      throw error
    }
  },
  sendApproveMail: async (email) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Approve profile on the ${process.env.COMPANY_NAME}`,
        text: '',
        html: `
                <div>
                <h1>Your profile on the ${process.env.COMPANY_NAME} was approved</h1>
                <div>Your profile has been approved by the admin, now you can enter your account </div>
                <div>Follow the link <a target="_blank" href=${process.env.CLIENT_URL}/auth>${process.env.CLIENT_URL}</a></div>
                </div>
              `
      })
    } catch (error) {
      throw error
    }
  },
  sendNewUserCustomerDataMail: async (email, password, link) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `You have created an account on the ${process.env.COMPANY_NAME}`,
        text: '',
        html: `
                <div>
                <h1>You have created an account on the ${process.env.COMPANY_NAME}</h1>
                <div>For confirm email follow the link</div>
                <a target="_blank" href=${link}>${link}</a>
                <div>Your data for login</div>
                <div>Email: ${email}</div>
                <div>Password: ${password}</div>
                </div>
              `
      })
    } catch (error) {
      throw error
    }
  }
}
