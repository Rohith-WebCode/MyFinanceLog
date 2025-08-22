import { useSelector } from 'react-redux';
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const CategoryPieChart = () => {
      const{transactions} = useSelector((state)=> state.Transaction);
      const COLORS = [  "#8884d8", "#82ca9d", "#ffc658","#ff7f7f", "#00C49F", "#0088FE" ];
      
      const categoryData  = Object.values(
        (transactions||[])
        .filter((t) => t?.type === "expense")
        .reduce((acc,transaction) =>{
          const category = transaction?.category || "other";
   
          if(!acc[category]){
            acc[category] = {name:category,value:0};
          }

          acc[category].value += Math.round( Number(transaction?.amount))
          return acc;

        },{})
      )
     
  const totalExpense = Math.round((transactions || [])
  .filter((t) => t?.type === "expense")
  .reduce((sum, t) => sum + (t?.amount || 0), 0));    

      
  return (
   <div className="flex flex-col items-center p-4 shadow-lg rounded-2xl bg-white h-100 flex- 1">
      <h2 className="text-base lg:text-lg font-semibold mb-4">Expenses by categories</h2>
         <ResponsiveContainer>
       <PieChart width={80} height={800}>
        <Pie
        data={categoryData}
        innerRadius={70}
        outerRadius={100}
        paddingAngle={2}
        dataKey="value"
        >
           {categoryData.length > 0 &&
           
           categoryData.map((entry, index) => (
          <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]}/>
        ))}

            <Label
            value={`₹${totalExpense}`}
            position="center"
            style={{ fontSize: '18px', fontWeight: 'bold' }}
          />
        </Pie>

       <Tooltip/>
       <Legend 
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          alignItems:"center",
          fontSize:"10px",
          flexWrap: "wrap",
          gap: "10px"  
        }}
        />
       </PieChart>
        </ResponsiveContainer>
        </div>
  )
}

export default CategoryPieChart