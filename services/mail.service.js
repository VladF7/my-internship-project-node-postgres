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
    async sendSuccessOrderMail (email, name, city, size, master_id, start, end) {
        let master_name = await mastersModel.getMasterById(master_id)
            master_name = master_name.name
        let time_to_fix = await clocksService.getTimeToFix(size)
            time_to_fix = time_to_fix.time
        
        let date = formDate.getDate(start)
        let start_to_fix = formDate.getTime(start)
        let end_to_fix = formDate.getTime(end)

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
                            Размер часов - ${size}, время ремонта займет ${time_to_fix} час/а.
                        </div>
                        <div>
                            Мастер ${master_name}, будет у вас с ${start_to_fix} до ${end_to_fix}.
                        </div>     
                    </div>
                `
        })
    }
}