const express = require('express')
const Router = express.Router()
const {getLast30DaysExpenses,getLast30DaysIncome} = require('../controllers/Income_ExpenseController')
const protect = require('../middleware/protect')


Router.get('/transactions/expense/30days', protect, getLast30DaysExpenses);
Router.get('/transactions/income/30days', protect, getLast30DaysIncome);

module.exports = Router