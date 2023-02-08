const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',     
    password: 'root',
    database: 'my-internship-db',
    port: 5432,
})

pool.connect((err)=>{
    if(err){
        console.log(err)
        return err
    }
    console.log('db connected')
})

module.exports = pool