import React from 'react'
import Logo from "../assets/Finance_Service_Logo.png"

const Sidebar = () => {
  return (
    <div className='p-4 w-6xl'>
        <div className='flex items-center'>
        <img src={Logo} className='w-10'/>
        <h1 className='text-xl font-bold'>MyFinanceLog</h1>
        </div>


    </div>
  )
}

export default Sidebar