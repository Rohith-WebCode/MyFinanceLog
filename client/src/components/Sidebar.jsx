import React from 'react'
// import Logo from "../assets/Finance_Service_Logo.png"
import { MdSpaceDashboard } from "react-icons/md";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = () => {
  return (
    <div className='w-6xl text-center p-7'>

         <div className='flex items-center mb-8'>
        <h1 className='text-xl font-bold'>MyFinanceLog</h1>
        </div>
        <div className='block'>
          <div className='flex items-center py-2 gap-2'>
            <MdSpaceDashboard />
            <p className='text-lg'>Dashboard</p>
          </div>
          <div className='flex items-center py-2 gap-2'>
            <FaMoneyBillWave />
            <p className='text-lg'>Income</p>
          </div>
          <div className='flex items-center py-2 gap-2'>
            <FaShoppingCart/>
            <p className='text-lg'>Expenses</p>
          </div>
        </div>

        <div className='absolute bottom-2'>
           <div className='flex items-center py-2 gap-2'>
            <HiOutlineLogout className=''/>
            <p className='text-lg font-normal'>Logout</p>
          </div>
        </div>


    </div>
  )
}

export default Sidebar