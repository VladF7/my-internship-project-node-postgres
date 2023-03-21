const database = require('../database')

module.exports = {
    async getClocksId(size) {
        const clockId = await database.query('SELECT id FROM clocks WHERE size = $1',[size])
        return clockId.rows[0].id
    },
    async getTimeToFix(size) {
        const timeToFix = await database.query('SELECT "timeToFix" FROM clocks WHERE size = $1',[size])
        return timeToFix.rows[0].timeToFix
    },
}