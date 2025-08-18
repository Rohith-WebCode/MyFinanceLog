import React from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { useDispatch} from 'react-redux'
import { openDialog } from '../store/TransactionSlice';
import IncomeExpensesDialog from '../components/IncomeExpensesDialog';
import TotalCards from '../components/TotalCards';
import AnalyticsChart from '../components/AnalyticsChart';

const Dashboard = () => {
  const dispatch  = useDispatch();

  return (
    <div className='w-full'>
    <div className="flex absolute right-6">
      <button 
      className="flex items-center gap-2 border-2 border-blue-700 rounded-lg bg-neutral-50 text-blue-700 py-2 px-5 mr-2 transition" 
      onClick={() => dispatch(openDialog("expense"))}
      >
        <HiMinus className="text-blue-700 text-sm md:text-base" />
      <p className='text-sm md:text-base'>Expense</p>  
      </button>

      <button 
      className="flex items-center gap-2 border rounded-lg bg-blue-700 text-neutral-50 py-2 px-5 mr-2 hover:bg-blue-800 transition"
      onClick={() => dispatch(openDialog("income"))}
      >
        <HiPlus className="text-neutral-50 text-sm md:text-base" />
       <p className='text-sm md:text-base'>Income</p> 
      </button>
    <IncomeExpensesDialog/>
    </div>
    <TotalCards/>

    <div className='pt-5 flex'>
       <AnalyticsChart/>
       <div><p>hi</p></div>
    </div>



    
    </div>
  )
}

export default Dashboard