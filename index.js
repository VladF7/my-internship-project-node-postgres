const express = require('express')
const router = require('./routes/mainRouter')
const pool = require('./database')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use('/api', router)

pool.connect((err)=>{
    if(err){
        console.log(err)
        return err
    }
    console.log('db connected')
})

app.listen(PORT,()=> console.log('Server started on PORT'+ ' ' + PORT ))

