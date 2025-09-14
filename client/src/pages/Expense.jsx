import React, { useEffect } from 'react'
import ExpenseLineChart from '../components/ExpenseLineChart'
import ExpensesTable from '../components/ExpensesTable'
import { useDispatch } from 'react-redux';
import { get30daysExpense, getExpense } from '../store/TransactionSlice';

const Expense = () => {
  const dispatch = useDispatch();

    useEffect (() => {
      dispatch(getExpense(1));
      dispatch(get30daysExpense())
    }, [dispatch]);
 
  return (
    <div className='w-full relative'>
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