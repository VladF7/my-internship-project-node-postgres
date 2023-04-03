import nodemailer from 'nodemailer'
import { getDate, getTime } from '../date.js'
import mastersModel from '../models/masters.model.js'
import clocksModel from '../models/clocks.model.js'
import citiesModel from '../models/cities.model.js'
import customersModel from '../models/customers.model.js'
import CustomError from '../customError.js'

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
      const customerEmail = await customersModel.getCustomerByEmail(email)
      if (!customerEmail) {
        throw new CustomError(
          'CUSTOMER_IS_NOT_EXIST',
          404,
          `Customer with email ${customerEmail} is not exist`
        )
      }
      const customerName = await customersModel.getCustomerByName(name)
      if (!customerName) {
        throw new CustomError(
          'CUSTOMER_IS_NOT_EXIST',
          404,
          `Customer with name ${customerName} is not exist`
        )
      }
      const city = await citiesModel.getCityById(cityId)
      if (!city) {
        throw new CustomError('CITY_IS_NOT_EXIST', 404, `City with id ${cityId} is not exist`)
      }
      const clock = await clocksModel.getClockById(clockId)
      if (!clock) {
        throw new CustomError('CLOCK_IS_NOT_EXIST', 404, `Clock with id ${clockId} is not exist`)
      }
      const master = await mastersModel.getMasterById(masterId)
      if (!master) {
        throw new CustomError('MASTER_IS_NOT_EXIST', 404, `Master with id ${masterId} is not exist`)
      }
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
                <h1>Вы успешно оформили заказ на сайте ${process.env.API_URL}</h1>
                <div>
                    <div>
                        Здравствуйте, ${name}, вы оформили заказ на ремонт часов, в городе ${cityName} на ${date}.
                    </div>
                    <div>
                        Размер часов - ${size}, время ремонта займет ${timeToFix} час/а.
                    </div>
                    <div>
                        Мастер ${masterName}, будет у вас с ${startTime} до ${endTime}.
                    </div>
                </div>
              `
      })
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
}
