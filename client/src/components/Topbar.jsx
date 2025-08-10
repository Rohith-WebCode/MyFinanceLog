import React from 'react'
import '../App.css'
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavbarDrawer from './NavbarDrawer';


const Topbar = () => {
  return (
  <div className="p-4 w-full">
    <div className='flex justify-between md:justify-end items-center gap-4'>

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
      <AccountCircleIcon sx={{fontSize:{xs:35, sm:40} , color: "#555" }} />

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