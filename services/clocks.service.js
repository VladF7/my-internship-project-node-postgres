const clocksModel = require('../models/clocks.model')

module.exports = {
    async getClocksId(size) {
        return await clocksModel.getClocksId(size)
    },
    async getTimeToFix(size) {
        return await clocksModel.getTimeToFix(size)
    },
}