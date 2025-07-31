require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const connectDB = require('./db/db');
const userRoutes = require('./routes/userRoutes')

connectDB()

  
app.use(cors())
app.use(express.json())

app.use('/api',userRoutes)

app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT||3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))