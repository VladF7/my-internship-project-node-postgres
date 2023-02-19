require('dotenv').config()
const express = require('express')
const router = require('./routes/mainRouter')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOption')
const connectDB = require('./config/dbConfig')
const PORT = process.env.PORT || 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try {
        connectDB()
        app.listen(PORT,()=> console.log('Server started on PORT'+ ' ' + PORT ))
    } catch (error) {
        console.log(error);
    }
}
console.log(process.env.NODE_ENV);

start()