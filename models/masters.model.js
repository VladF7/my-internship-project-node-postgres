import { Op } from 'sequelize'
import sequelize from '../db/database.js'
import { CityMaster } from '../db/models/CityMaster.js'
import { Master } from '../db/models/Master.js'
import { Order } from '../db/models/Order.js'
import { User } from '../db/models/User.js'
import { City } from '../db/models/Сity.js'

export default {
  getMasters: async () => {
    const masters = await Master.findAll({
      include: [
        {
          model: City,
          as: 'cities'
        },
        {
          attributes: ['isEmailActivated', 'email'],
          model: User
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
    const busyMastersId = busyMasters.map((master) => master.dataValues.masterId)
    const freeMasters = await Master.findAll({
      where: { id: { [Op.notIn]: busyMastersId } },
      order: [['rating', 'DESC']],
      include: [
        {
          where: { id: cityId },
          model: City,
          as: 'cities'
        }
      ]
    })
    return freeMasters
  },
  getFreeMastersForCurrentOrder: async (startTime, endTime, orderId, cityId) => {
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
    const busyMastersId = busyMasters.map((master) => master.dataValues.masterId)
    const freeMastersForCurrentOrder = await Master.findAll({
      where: { id: { [Op.notIn]: busyMastersId } },
      order: [['rating', 'DESC']],
      include: [
        {
          where: { id: cityId },
          model: City,
          as: 'cities'
        }
      ]
    })
    return freeMastersForCurrentOrder
  },
  deleteMasterAndUserAndCities: async (id, userId) => {
    const transaction = await sequelize.transaction()
    try {
      await CityMaster.destroy({ where: { masterId: id }, transaction })
      const deletedMaster = await Master.destroy({
        where: { id },
        returning: true,
        plain: true,
        transaction
      })
      await User.destroy({ where: { id: userId }, transaction })
      await transaction.commit()
      return deletedMaster
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  editMasterAndCities: async (id, name, rating, cities) => {
    const transaction = await sequelize.transaction()
    try {
      const editedMaster = await Master.update({ name, rating }, { where: { id }, transaction })
      await CityMaster.destroy({ where: { masterId: id }, transaction })
      await CityMaster.bulkCreate(
        cities.map((cityId) => ({ cityId, masterId: id })),
        { transaction }
      )
      await transaction.commit()
      return editedMaster
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  isMasterAvailable: async (id, startTime, endTime) => {
    const busyMasters = await Order.findAll({
      attributes: ['masterId'],
      where: {
        [Op.and]: {
          masterId: id,
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
      }
    })
    return !busyMasters.length
  }
}
