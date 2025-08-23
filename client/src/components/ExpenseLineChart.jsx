import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from "date-fns";
import { openDialog } from '../store/TransactionSlice';
import { HiMinus } from 'react-icons/hi';
import IncomeExpensesDialog from './IncomeExpensesDialog';
const ExpenseLineChart = () => {
    const dispatch  = useDispatch();
      const {daysExpense } = useSelector(
    (state) => state.Transaction
  );

const formattedData = daysExpense
    .map((tx) => ({
      ...tx,
      date: format(parseISO(tx.date), "MMM d"), 
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); 

  return (
<div className="w-full p-4 bg-white rounded-lg shadow-md">
  <div className='flex justify-between'>
      <p className="font-semibold text-base md:text-lg mb-4">Last 30 Days Expenses</p>
              <button 
              className="flex items-center gap-2 shadow-sm border-blue-700 rounded-md bg-neutral-50 text-blue-800 font-bold py-2 px-5 mr-2 transition cursor-pointer" 
              onClick={() => dispatch(openDialog("expense"))}
              >
                <HiMinus className=" text-sm" />
              <p className='text-sm'>Expense</p>  
              </button>
  </div>
     <IncomeExpensesDialog/>
       <ResponsiveContainer width="100%" height={300}>
        <LineChart 
        width={500}
        height={300} 
        
        data={formattedData}
         margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
        
    
    </div>
  )
}

export default ExpenseLineChart