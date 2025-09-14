import { useDispatch } from 'react-redux';
import IncomeAreaChart from '../components/IncomeAreaChart'
import IncomeTable from '../components/IncomeTable'
import { get30daysIncome, getIncome } from '../store/TransactionSlice';
import { useEffect } from 'react';

const Income = () => {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getIncome(1)); 
      dispatch(get30daysIncome())
    }, [dispatch]);
  
  return (
    <div className='w-full relative'>
        <div>
            <IncomeAreaChart/>
        </div>
        <div className='my-6'>
            <IncomeTable/>
        </div>
        
    </div>
  )
}

export default Income