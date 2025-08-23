import { format, parseISO } from "date-fns"; 
import { useDispatch, useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { openDialog } from "../store/TransactionSlice";
import { HiPlus } from "react-icons/hi";
import IncomeExpensesDialog from "./IncomeExpensesDialog";
const IncomeAreaChart = () => {
    const dispatch  = useDispatch();
    const {chartdataincome } = useSelector(
    (state) => state.Transaction
  );
  console.log(chartdataincome);

  const formattedData = chartdataincome
      .map((tx) => ({
        ...tx,
        date: format(parseISO(tx.date), "MMM d"), 
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); 
  
  return (
      <div className="w-full p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between">
                <p className="font-semibold text-base md:text-lg mb-4">Last 30 Days Income</p>     
               <button 
                  className="flex items-center gap-2 shadow-sm border-blue-700 rounded-md bg-neutral-50 text-blue-800 font-bold py-2 px-5 mr-2 transition cursor-pointer" 
                  onClick={() => dispatch(openDialog("income"))}
                  >
                  <HiPlus className=" text-sm" />
                  <p className='text-sm'>Income</p>  
              </button>
        </div>
            <IncomeExpensesDialog/>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        width={500}
        height={400}
        data={formattedData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  )
}

export default IncomeAreaChart