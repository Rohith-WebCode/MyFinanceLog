import { format, parseISO } from "date-fns";
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const IncomeAreaChart = () => {
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
      <p className="font-semibold text-base md:text-lg mb-4">Last 30 Days Income</p>
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