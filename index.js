import 'dotenv/config'
import express from 'express'
import routes from './router/mainRouter.js'
import cors from 'cors'
import corsOptions from './config/corsOption.js'
import connectDB from './config/dbConfig.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', routes)

const start = async () => {
  try {
    connectDB()
    app.listen(PORT, () => console.log('Server started on PORT' + ' ' + PORT))
  } catch (error) {
    console.log(error)
  }
}

start()
