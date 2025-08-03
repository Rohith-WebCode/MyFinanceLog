const express = require('express')
const Router = express.Router()
const {getIncomeTransactions,getExpenseTransactions} = require('../controllers/Income_ExpenseController')
const protect = require('../middleware/protect')


Router.get('/transactions/income', protect, getIncomeTransactions);
Router.get('/transactions/expense', protect, getExpenseTransactions);

module.exports = Router