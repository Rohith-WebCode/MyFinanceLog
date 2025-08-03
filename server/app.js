require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const connectDB = require('./db/db');
const userRoutes = require('./routes/userRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const Income_Expense = require('./routes/Income_Expense')

connectDB()

  
app.use(cors())
app.use(express.json())

app.use('/api',userRoutes)
app.use('/api',transactionRoutes)
app.use('/api',Income_Expense)

// app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT||3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))