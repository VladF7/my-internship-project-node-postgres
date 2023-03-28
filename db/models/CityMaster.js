import { DataTypes } from 'sequelize'
import sequelize from '../database.js'

import { Master } from './Master.js'
import { City } from './Сity.js'

const CityMaster = sequelize.define('citiesMaster', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

Master.belongsToMany(City, { through: CityMaster, onDelete: 'RESTRICT' })
City.belongsToMany(Master, { through: CityMaster, onDelete: 'RESTRICT' })

export { CityMaster }
