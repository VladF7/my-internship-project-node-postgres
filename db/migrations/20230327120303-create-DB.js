// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      priceForHour: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
    await queryInterface.createTable('masters', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
    await queryInterface.createTable('citiesMasters', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      masterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'masters', key: 'id' }
      },
      cityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cities', key: 'id' }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
    await queryInterface.createTable('clocks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timeToFix: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }),
      await queryInterface.createTable('statuses', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }),
      await queryInterface.createTable('orders', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        startTime: {
          type: Sequelize.DATE,
          allowNull: false
        },
        endTime: {
          type: Sequelize.DATE,
          allowNull: false
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        statusId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'statuses', key: 'id' }
        },
        customerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'customers', key: 'id' }
        },
        clockId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'clocks', key: 'id' }
        },
        masterId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'masters', key: 'id' }
        },
        cityId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'cities', key: 'id' }
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('orders')
    await queryInterface.dropTable('citiesMasters')
    await queryInterface.dropTable('customers')
    await queryInterface.dropTable('cities')
    await queryInterface.dropTable('masters')
    await queryInterface.dropTable('clocks')
    await queryInterface.dropTable('statuses')
  }
}
