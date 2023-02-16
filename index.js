const express = require('express')
const router = require('./routes/mainRouter')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/api', router)
app.use(cors(corsOptions))


app.listen(PORT,()=> console.log('Server started on PORT'+ ' ' + PORT ))

