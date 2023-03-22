import pg from 'pg'

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

export default connectDB