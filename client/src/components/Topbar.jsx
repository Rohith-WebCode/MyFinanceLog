import '../App.css'
import { Button } from "@mui/material";
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
      <div className='flex items-center'>


      {/* Profile Icon */}
      {
        user ? <img src={user.profilePic} className='w-12 h-12 rounded-full '/> : <Link to="/register"><Button variant="outlined"sx={{ mx: 2, borderRadius:10, fontSize:12}}>sign Up</Button></Link> 
      }
    

      <NavbarDrawer/>
      </div>  
    </div>
    </div>
  )
}

export default Topbar