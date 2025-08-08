import React from 'react'
import Logo from "../assets/Finance_Service_Logo.png"
import { MdSpaceDashboard } from "react-icons/md";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = () => {
  return (
    <div className='p-10 w-6xl text-center'>
        <div className='flex items-center mb-3'>
        <img src={Logo} className='w-10'/>
        <h1 className='text-xl font-bold'>MyFinanceLog</h1>
        </div>
        <div className='block gap-3'>
          <div className='flex items-center py-2'>
            <MdSpaceDashboard />
            <p className='text-lg'>Dashboard</p>
          </div>
          <div className='flex items-center py-2'>
            <FaMoneyBillWave />
            <p className='text-lg'>Income</p>
          </div>
          <div className='flex items-center py-2'>
            <FaShoppingCart/>
            <p className='text-lg'>Expenses</p>
          </div>
        </div>

        <div className=''>
           <div className='flex items-center py-2'>
            <HiOutlineLogout/>
            <p className='text-lg font-normal'>Logout</p>
          </div>
        </div>


    </div>
  )
}

export default Sidebar