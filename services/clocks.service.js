import clocksModel from '../models/clocks.model.js'

export default {
    async getClocksId(size) {
        return await clocksModel.getClocksId(size)
    },
    async getTimeToFix(size) {
        return await clocksModel.getTimeToFix(size)
    },
}