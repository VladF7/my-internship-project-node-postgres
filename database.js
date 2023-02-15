const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',     
    password: 'root',
    database: 'my-internship-db',
    port: 5432,
})

module.exports = pool