import IncomeAreaChart from '../components/IncomeAreaChart'
import IncomeTable from '../components/IncomeTable'

const Income = () => {
  return (
    <div className='w-full'>
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