import React from 'react'
// import Logo from "../assets/Finance_Service_Logo.png"
import { MdSpaceDashboard } from "react-icons/md";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMe, logOut } from '../store/authSlice';
import { resetTransactions } from '../store/TransactionSlice';

const Sidebar = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(resetTransactions()); 
    navigate("/register", { replace: true });
  };


  return (
    <div className='w-6xl text-center p-7'>

         <div className='flex items-center mb-8'>
        <h1 className='text-xl font-bold'>MyFinance</h1>
        </div>
        <div className='block'>
          <div className='flex items-center py-2 gap-2'>
            <MdSpaceDashboard />
           <Link to="/"><p className='text-lg'>Dashboard</p></Link> 
          </div>
          <div className='flex items-center py-2 gap-2'>
            <FaMoneyBillWave />
           <Link to="/income"><p className='text-lg'>Income</p></Link>
          </div>
          <div className='flex items-center py-2 gap-2'>
            <FaShoppingCart/>
           <Link to="/expense"><p className='text-lg'>Expenses</p></Link> 
          </div>
        </div>

        <div className='absolute bottom-2' onClick={handleLogout}>
           <div className='flex items-center py-2 gap-2'>
            <HiOutlineLogout className=''/>
            <p className='text-lg font-normal'>Logout</p>
          </div>
        </div>


    </div>
  )
}

export default Sidebar