require('dotenv').config();

const express = require('express')
const app = express()
const cors = require('cors');
const  cookieParser = require ('cookie-parser')
const connectDB = require('./db/db');
const userRoutes = require('./routes/userRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const Income_Expense = require('./routes/Income_Expense')

connectDB()

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true 
}))
app.use(express.json())
app.use(cookieParser());
app.use('/api',userRoutes)
app.use('/api',transactionRoutes)
app.use('/api',Income_Expense)

app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT||5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))