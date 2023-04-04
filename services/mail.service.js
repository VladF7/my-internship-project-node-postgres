/* eslint-disable no-useless-catch */
import nodemailer from 'nodemailer'
import { getDate, getTime } from '../date.js'
import mastersModel from '../models/masters.model.js'
import clocksModel from '../models/clocks.model.js'
import citiesModel from '../models/cities.model.js'

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
      throw error
    }
  }
}
