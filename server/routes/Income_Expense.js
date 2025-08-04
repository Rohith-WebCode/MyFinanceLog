const express = require('express')
const Router = express.Router()
const {getIncomeTransactions,getExpenseTransactions,getLast30DaysExpenses,getLast60DaysIncome} = require('../controllers/Income_ExpenseController')
const protect = require('../middleware/protect')


Router.get('/transactions/income', protect, getIncomeTransactions);
Router.get('/transactions/expense', protect, getExpenseTransactions);
Router.get('/transactions/expense/30days', protect, getLast30DaysExpenses);
Router.get('/transactions/income/60days', protect, getLast60DaysIncome);

module.exports = Router