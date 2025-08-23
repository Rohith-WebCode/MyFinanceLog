import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { MdSpaceDashboard } from "react-icons/md";
import { FaMoneyBillWave, FaShoppingCart } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { logOut } from '../store/authSlice';

export default function NavbarDrawer() {
  const [open, setOpen] = React.useState(false);

   const dispatch = useDispatch();

   const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(resetTransactions()); 
    navigate("/register", { replace: true });
  };



  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


   const navLinks = [
    { text: 'Dashboard', path: '/', icon: <MdSpaceDashboard /> },
    { text: 'Income', path: '/income', icon: < FaMoneyBillWave/> },
    { text: 'Expenses', path: '/expense', icon: <FaShoppingCart /> },
    { text: 'Logout', onClick:handleLogout, icon: < HiOutlineLogout/> },
  ];


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
     <List>
        {navLinks.map((link, index) => (
          <ListItem key={link.text} disablePadding>
            <ListItemButton
              component={Link}
              to={link.path}
              onClick={link.onClick ? link.onClick : undefined}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>

        <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
         sx={{
           ml: 2,
           p:0,
        }}
        className='hide-on-md '
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
