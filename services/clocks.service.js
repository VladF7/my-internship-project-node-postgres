import clocksModel from '../models/clocks.model.js'

export default {
    getClocksId: async (size) => {
        return await clocksModel.getClocksId(size)
    },
    getTimeToFix: async (size) => {
        return await clocksModel.getTimeToFix(size)
    },
}