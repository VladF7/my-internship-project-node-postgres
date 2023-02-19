const pg = require('pg')
const client = new pg.Client(process.env.DB_URL)

const connectDB = async() => {
    client.connect((err)=>{
            if(err){
                console.log(err)
                return err
            }
            console.log('db connected')
        })
}

module.exports = connectDB