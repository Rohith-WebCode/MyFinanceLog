import React, { useState } from 'react'
import '../App.css'
import { InputBase, IconButton, Paper, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavbarDrawer from './NavbarDrawer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Topbar = () => {
  const { user} = useSelector(state => state.auth);

  return (
  <div className="p-4 w-full">
    <div className='flex justify-between md:justify-end px-5 items-center gap-4'>

     <div className='flex md:hidden'>
        <h1 className='text-lg font-bold'>MyFinanceLog</h1>
      </div>
      {/* Search Box */}
      <div className='flex items-center'>
      <Paper
        component="form"
        sx={{
           display: { xs: "none", sm: "flex" },
          alignItems: "center",
          width:{
           xs:150,
           md:200
          },
          padding: "2px 4px",
         
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize:{xs:11, md:15}}}
          placeholder="Search transactions..."
        />
        <IconButton type="submit" sx={{ p: "8px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>


      {/* Profile Icon */}
      {
        user ? <img src={user.profilePic} className='w-12 h-12 rounded-full '/> : <Link to="/register"><Button variant="outlined"sx={{ mx: 2, borderRadius:10, fontSize:12}}>sign Up</Button></Link> 
      }
    

      <NavbarDrawer/>
      </div>  
    </div>

{/* mobile search bar */}

          <Paper
        component="form"
        sx={{
           display: { xs: "flex", sm: "none" },
          alignItems: "center",
          width: "100%",
          padding: "2px 4px",
         
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize:{xs:11, md:15}}}
          placeholder="Search transactions..."
        />
        <IconButton type="submit" sx={{ p: "8px" }}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  )
}

export default Topbar