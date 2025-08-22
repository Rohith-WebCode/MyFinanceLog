import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from "date-fns";
const ExpenseLineChart = () => {
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
      <p className="font-semibold text-base md:text-lg mb-4">Last 30 Days Expenses</p>
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