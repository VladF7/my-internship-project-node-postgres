import cron from 'node-cron'
import { ordersModel } from '../models/model.layer.js'
import mailService from '../services/mail.service.js'

const TIMEZONE = 'Europe/Kiev'

const startCron = () => {
  try {
    cron.schedule('0 * * * *', async () => {
      const orderStartTime = new Date().toLocaleString('en-US', {
        hour12: false,
        timeZone: TIMEZONE
      })

      const orders = await ordersModel.getOrdersThatStartInOneHour(orderStartTime)
      const allMails = orders.map((order) => mailService.sendMasterReminder(order))
      await Promise.allSettled(allMails)
    })
  } catch (error) {
    console.error('Cron notifications has not been run:', error)
  }
}

export default startCron
