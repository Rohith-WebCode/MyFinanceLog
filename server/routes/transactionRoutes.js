const express = require('express')
const Router = express.Router()
const {addTransaction,getTransactions,deleteTransaction} = require ('../controllers/transactionController')
const protect = require('../middleware/protect')


Router.post('/transactions',protect,addTransaction)
Router.get('/transactions',getTransactions)
Router.delete('/transactions/:id',deleteTransaction)

module.exports = Router