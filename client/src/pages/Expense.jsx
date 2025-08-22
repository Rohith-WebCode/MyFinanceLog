import React from 'react'
import ExpenseLineChart from '../components/ExpenseLineChart'
import ExpensesTable from '../components/ExpensesTable'

const Expense = () => {
  return (
    <div className='w-full'>
         <div>
        <ExpenseLineChart/>
        </div>
         <div className='my-6'>
        <ExpensesTable/>
        </div>
        
    </div>
  )
}

export default Expense