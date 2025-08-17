import { Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getLastMonthTransactions } from "../store/TransactionSlice";
import { MdOutlineAccountBalance } from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";


const TotalCards = () => {
  const dispatch  = useDispatch()
 
  const{transactions} = useSelector((state)=> state.Transaction);
  
  useEffect(() => {
    dispatch(getLastMonthTransactions()) 
  },[dispatch])
  
const totalIncome = (transactions || [])
  .filter((t) => t?.type === "income")
  .reduce((sum, t) => sum + (t?.amount || 0), 0);

const totalExpense = (transactions || [])
  .filter((t) => t?.type === "expense")
  .reduce((sum, t) => sum + (t?.amount || 0), 0);

const balance = totalIncome - totalExpense;


  return (
    <div className='lg:flex pt-12 w-full'>
       <Card sx={{ m:2, p: 2,flex: 1,borderRadius:4}}>
        <CardContent sx={{display:"flex",alignItems:"center", gap:2}}>
          <div className="bg-blue-700 p-3 rounded-full">
             <MdOutlineAccountBalance className="text-4xl text-neutral-50"/>
          </div>
          <div className="">
            <Typography sx={{fontSize:17}}>Total Balance</Typography>
            <Typography variant="h4" sx={{fontSize:15}}>
            {balance}
            </Typography>
            <Typography sx={{fontSize:13}}>Last Month</Typography>
          </div>
        </CardContent>
        </Card>

       <Card sx={{ m: 2, p: 2,flex: 1,borderRadius:4}}>
        <CardContent sx={{display:"flex",alignItems:"center", gap:2}}>
            <div className="bg-orange-700 p-3 rounded-full">
             <MdOutlineAccountBalanceWallet className="text-4xl text-neutral-50"/>
          </div>
          <div>
            <Typography sx={{fontSize:17}}>Income</Typography>
            <Typography sx={{fontSize:15}} color="green">₹{totalIncome}</Typography>
             <Typography sx={{fontSize:13}}>Last Month</Typography>
          </div>
        </CardContent>
        </Card>

        <Card sx={{ m: 2, p: 2,flex: 1,borderRadius:4}}>
        <CardContent sx={{display:"flex",alignItems:"center", gap:2}}>
           <div className="bg-red-700 p-3 rounded-full">
             <GiReceiveMoney className="text-4xl text-neutral-50"/>
          </div>
          <div>
            <Typography sx={{fontSize:17}}>Expense</Typography>
            <Typography sx={{fontSize:15}} color="red">₹{totalExpense}</Typography>
             <Typography sx={{fontSize:13}}>Last Month</Typography>
          </div>
        </CardContent>
        </Card>

    </div>
  )
}

export default TotalCards