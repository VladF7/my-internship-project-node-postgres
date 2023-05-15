import { Op } from 'sequelize'
import sequelize from '../db/database.js'
import { City, User, Order, Master, CityMaster } from '../db/models/models.DALayer.js'

export default {
  getMasters: async (page, limit) => {
    const masters = await Master.findAndCountAll({
      limit: limit,
      offset: page * limit,
      order: [['id', 'DESC']],
      distinct: true,
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT ROUND (AVG(rating),1) FROM orders WHERE orders."masterId" = master.id)`
            ),
            'rating'
          ]
        ]
      },
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
  getFreeMasters: async (startTime, endTime, cityId, currentUserId) => {
    const busyMasters = await Order.findAll({
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
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT ROUND (AVG(rating),1) FROM orders WHERE orders."masterId" = master.id)`
            ),
            'rating'
          ]
        ]
      },
      where: {
        [Op.and]: {
          isActivated: { [Op.ne]: false },
          userId: { [Op.ne]: currentUserId },
          id: { [Op.notIn]: busyMastersId }
        }
      },
      include: [
        {
          where: { id: cityId },
          model: City,
          attributes: ['id', 'name']
        }
      ],
      order: [['rating', 'ASC']]
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
      where: {
        [Op.and]: {
          isActivated: { [Op.ne]: false },
          id: { [Op.notIn]: busyMastersId }
        }
      },
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT ROUND (AVG(rating),1) FROM orders WHERE orders."masterId" = master.id)`
            ),
            'rating'
          ]
        ]
      },
      include: [
        {
          where: { id: cityId },
          model: City,
          as: 'cities'
        }
      ],
      order: [['rating', 'ASC']]
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
  editMasterAndCities: async (id, name, cities) => {
    const transaction = await sequelize.transaction()
    try {
      const editedMaster = await Master.update({ name }, { where: { id }, transaction })
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
  },
  getMasterByUserId: async (userId) => {
    const master = await Master.findOne({ where: { userId } })
    return master
  }
}
