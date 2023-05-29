import cron from 'node-cron'
import { ordersModel } from '../models/model.layer.js'
import mailService from '../services/mail.service.js'

const EUROPE_KIEV_TIMEZONE_OFFSET = -180

const startCron = () => {
  try {
    cron.schedule('*/30 * * * * *', async () => {
      console.log('start cron')
      console.log(new Date())
      const orders = await ordersModel.getOrdersThatStartInOneHour(EUROPE_KIEV_TIMEZONE_OFFSET)
      const allMails = orders.map((order) => mailService.sendMasterReminder(order))
      await Promise.allSettled(allMails)
    })
  } catch (error) {
    console.error('Cron notifications has not been run:', error)
  }
}

export default startCron
