const express = require('express')
const Router = express.Router()
const {addTransaction,getTransactions,deleteTransaction} = require ('../controllers/transactionController')
const protect = require('../middleware/protect')


Router.post('/transactions',protect,addTransaction)
Router.get('/transactions',protect,getTransactions)
Router.delete('/transactions/:id',protect,deleteTransaction)

module.exports = Router