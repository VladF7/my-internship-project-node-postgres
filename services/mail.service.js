const nodemailer = require('nodemailer')
const formDate = require('../date')
const mastersModel = require('../models/masters.model')

const clocksService = require('../services/clocks.service')

const transporter = nodemailer.createTransport(
    {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    }
)

module.exports = {
    async sendSuccessOrderMail (email, name, city, size, masterId, start, end) {
        let masterName = await mastersModel.getMasterById(masterId)
            masterName = masterName.name
        const timeToFix = await clocksService.getTimeToFix(size)
        
        const date = formDate.getDate(start)
        const startTime = formDate.getTime(start)
        const endTime = formDate.getTime(end)

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `${process.env.COMPANY_NAME}`,
            text:'',
            html:
                `
                    <h1>Вы успешно оформили заказ на сайте ${process.env.API_URL}</h1>
                    <div>
                        <div>
                            Здравствуйте, ${name}, вы оформили заказ на ремонт часов, в городе ${city} на ${date}.
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
    }
}