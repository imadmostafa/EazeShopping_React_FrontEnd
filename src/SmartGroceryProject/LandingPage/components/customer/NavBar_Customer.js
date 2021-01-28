import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {useHistory} from 'react-router-dom';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {ThemeContext} from '../Contexts/ThemeContext';
import GroupIcon from '@material-ui/icons/Group';
import {useContext} from 'react'; 
import Switch from "@material-ui/core/Switch" ;
import {Paper,Typography} from '@material-ui/core';
import { useState } from 'react';
import ProductsShow_Cusotmer from './ProductsShow_Customer';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Link,
  Route
}from 'react-router-dom';
import VisionShopping_Main from './VisionShopping_Main';

import ProfileCustomer from './ProfileCustomer';








const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
   
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },// backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/shutterstock_170420135.jpg'})`,
  drawerOpen: {
   
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },//backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/shutterstock_170420135.jpg'})`,
  drawerClose: {
    
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
  },
}));

export default function NavBar_Customer() {
  const classes = useStyles();
  const theme = useTheme();
  const history=useHistory();
  const { darkState, setDarkState } = useContext(ThemeContext);
const[statedarkState,setStateDarkState]=useState(false);
//for change of dark mode switch
  const handleThemeChange=()=>{
      setStateDarkState(!statedarkState);
    setDarkState(statedarkState);
    };

  const [open, setOpen] = React.useState(false);

var store_owner=localStorage.getItem('user_name');
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
const image_path = localStorage.getItem('image_path');
  return (//
      <div>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{flex:1}}>
           
          </Typography>
          <IconButton onClick={handleThemeChange}>
{darkState? <Brightness7Icon/>:<Brightness4Icon/>}</IconButton>
{store_owner}

        </Toolbar>
      
      </AppBar>
      <Drawer
      
        variant="permanent"
        
        className={clsx(classes.drawer, {
          
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button onClick={() => history.push('/visionmain_shopping')}>
          <ListItemIcon>
        <AddShoppingCartIcon/>
      </ListItemIcon>
    <ListItemText primary="Shop"/>
</ListItem>
<ListItem button onClick={() => history.push('/productsshow_customer')}>
          <ListItemIcon>
          <ListAltIcon/>
      </ListItemIcon>
    <ListItemText primary="All Products"/>
</ListItem>
<Divider/>
<ListItem button onClick={() => history.push('/profile_customer')}>
          <ListItemIcon>
        <AccountCircleIcon/>
      </ListItemIcon>
    <ListItemText primary="Profile"/>
</ListItem>


<ListItem button onClick={() => history.push('/logout')}>
          <ListItemIcon>
          <LockIcon/>
      </ListItemIcon>
    <ListItemText primary="Logout"/>
</ListItem>

        </List>
      </Drawer>
      <main className={classes.content}>
      <div className={classes.toolbar} />
    



            <RouterSwitch>

    
            <Route exact path="/visionmain_shopping">
               <VisionShopping_Main></VisionShopping_Main>
                </Route>
            <Route exact path="/offers_maincustomer">
               <ProductsShow_Cusotmer></ProductsShow_Cusotmer>
                </Route>
            <Route exact path="/productsshow_customer">
               <ProductsShow_Cusotmer></ProductsShow_Cusotmer>
                </Route>
             
                <Route exact path="/profile_customer">
               <ProfileCustomer></ProfileCustomer>
                </Route>
           

            </RouterSwitch>

           
           

        
      </main>
    </div>
    
    </div>
  );
}
