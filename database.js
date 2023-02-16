const Pool = require('pg').Pool
const pool = new Pool({
    host: 'dpg-cfmkgf9a6gdmb5qdbemg-a',
    user: 'root',     
    password: '17YcxdNScEdOdnRgepGstO6ddwBwhdSF',
    database: 'internshipdb',
    port: 5432,
})

module.exports = pool