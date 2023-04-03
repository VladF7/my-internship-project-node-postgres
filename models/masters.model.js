import { Op } from 'sequelize'
import sequelize from '../db/database.js'
import { CityMaster } from '../db/models/CityMaster.js'
import { Master } from '../db/models/Master.js'
import { Order } from '../db/models/Order.js'
import { City } from '../db/models/Сity.js'

export default {
  getMasters: async () => {
    const masters = await Master.findAll({
      include: [
        {
          model: City,
          as: 'cities'
        }
      ]
    })
    return masters
  },
  getMastersByCityId: async (id) => {
    const masters = await Master.findAll({
      include: [
        {
          where: { id },
          model: City,
          as: 'cities'
        }
      ]
    })
    return masters
  },
  getMasterById: async (id) => {
    const master = await Master.findByPk(id, {
      include: [
        {
          model: City,
          as: 'cities'
        }
      ]
    })
    return master
  },
  getFreeMasters: async (startTime, endTime, cityId) => {
    const busyMasters = await Order.findAll({
      attributes: ['masterId'],
      where: {
        [Op.or]: {
          [Op.and]: {
            startTime: {
              [Op.lte]: startTime
            },
            endTime: {
              [Op.gte]: endTime
            }
          },
          endTime: {
            [Op.and]: {
              [Op.gt]: startTime,
              [Op.lt]: endTime
            }
          },
          startTime: {
            [Op.and]: {
              [Op.gt]: startTime,
              [Op.lt]: endTime
            }
          }
        }
      }
    })
    const AllMasters = await Master.findAll({
      include: [
        {
          where: { id: cityId },
          model: City,
          as: 'cities'
        }
      ]
    })
    const busyMastersId = busyMasters.map((master) => master.dataValues.masterId)
    const freeMasters = AllMasters.filter((master) => !busyMastersId.includes(master.dataValues.id))
    return freeMasters.sort((a, b) => b.rating - a.rating)
  },
  getFreeMastersForCurrOrder: async (startTime, endTime, orderId, cityId) => {
    const busyMasters = await Order.findAll({
      attributes: ['masterId', 'id'],
      where: {
        [Op.and]: {
          [Op.or]: {
            [Op.and]: {
              startTime: {
                [Op.lte]: startTime
              },
              endTime: {
                [Op.gte]: endTime
              }
            },
            endTime: {
              [Op.and]: {
                [Op.gt]: startTime,
                [Op.lt]: endTime
              }
            },
            startTime: {
              [Op.and]: {
                [Op.gt]: startTime,
                [Op.lt]: endTime
              }
            }
          },
          id: {
            [Op.ne]: orderId
          }
        }
      }
    })
    const AllMasters = await Master.findAll({
      include: [
        {
          where: { id: cityId },
          model: City,
          as: 'cities'
        }
      ]
    })
    const busyMastersId = busyMasters.map((master) => master.dataValues.masterId)
    const freeMasters = AllMasters.filter((master) => !busyMastersId.includes(master.dataValues.id))
    return freeMasters.sort((a, b) => b.rating - a.rating)
  },
  addMasterAndCities: async (name, rating, cities) => {
    const transaction = await sequelize.transaction()
    try {
      const newMaster = await Master.create({ name, rating }, { transaction })
      const masterId = newMaster.dataValues.id
      await CityMaster.bulkCreate(
        cities.map((cityId) => ({ cityId, masterId })),
        { transaction }
      )
      await transaction.commit()
      if (newMaster) {
        return newMaster
      }
    } catch (error) {
      console.log(error.message)
      await transaction.rollback()
    }
  },
  delMasterAndCities: async (masterId) => {
    const transaction = await sequelize.transaction()
    try {
      await CityMaster.destroy({ where: { masterId }, transaction })
      const delMaster = await Master.destroy({ where: { id: masterId }, transaction })
      await transaction.commit()
      if (delMaster) {
        return delMaster
      }
    } catch (error) {
      console.log(error.message)
      await transaction.rollback()
    }
  },
  editMasterAndCities: async (masterId, name, rating, cities) => {
    const transaction = await sequelize.transaction()
    try {
      const editedMaster = await Master.update(
        { name, rating },
        { where: { id: masterId }, transaction }
      )
      await CityMaster.destroy({ where: { masterId }, transaction })
      await CityMaster.bulkCreate(
        cities.map((cityId) => ({ cityId, masterId })),
        { transaction }
      )

      await transaction.commit()
      if (editedMaster) {
        return editedMaster
      }
    } catch (error) {
      console.log(error.message)
      await transaction.rollback()
    }
  },
  isMasterAvailable: async (id, startTime, endTime) => {
    const busyMasters = await Order.findAll({
      attributes: ['masterId'],
      where: {
        [Op.or]: {
          [Op.and]: {
            startTime: {
              [Op.lte]: startTime
            },
            endTime: {
              [Op.gte]: endTime
            }
          },
          endTime: {
            [Op.and]: {
              [Op.gt]: startTime,
              [Op.lt]: endTime
            }
          },
          startTime: {
            [Op.and]: {
              [Op.gt]: startTime,
              [Op.lt]: endTime
            }
          }
        }
      }
    })
    const busyMastersId = busyMasters.map((master) => master.dataValues.masterId)
    return !busyMastersId.includes(id)
  }
}

// getBusyMastersId: async (orders, startTime, endTime, orderId) => {
//   console.log(orderId)
//   orders = orders.filter((order) => order.id != orderId)
//   orders = orders.filter(
//     (order) =>
//       (getFormDate(startTime) < getFormDate(order.endTime) &&
//         getFormDate(endTime) > getFormDate(order.endTime)) ||
//       (getFormDate(startTime) < getFormDate(order.startTime) &&
//         getFormDate(endTime) > getFormDate(order.startTime)) ||
//       (getFormDate(startTime) >= getFormDate(order.startTime) &&
//         getFormDate(endTime) <= getFormDate(order.endTime))
//   )
//   const busyMastersId = orders.map((order) => order.masterId)
//   return busyMastersId
// },
