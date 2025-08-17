const express = require('express')
const Router = express.Router()
const {addTransaction,getTransactions,deleteTransaction,searchTransaction,getLastMonthTransactions} = require ('../controllers/transactionController')
const protect = require('../middleware/protect')


Router.post('/transactions',protect,addTransaction)
Router.get('/transactions',protect,getTransactions)
Router.get('/30days/transactions',protect,getLastMonthTransactions)
Router.delete('/transactions/:id',protect,deleteTransaction)
Router.get('/transactions/search',protect,searchTransaction)

module.exports = Router