const database = require('../database')

module.exports = {
    async getClocksId(size) {
        const clocks_id = await database.query('SELECT id FROM clocks WHERE size = $1',[size])
        return clocks_id.rows[0].id
    },
    async getTimeToFix(size) {
        const timeToFix = await database.query('SELECT time_to_fix AS time FROM clocks WHERE size = $1',[size])
        return timeToFix.rows[0]
    },
}