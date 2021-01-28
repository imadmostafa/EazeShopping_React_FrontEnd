import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import {useContext} from 'react'; 
import {UserContext} from '../components/Contexts/UserContext';
import Popover from '@material-ui/core/Popover';
import NavBar_Store from '../components/store/NavBar_Store';
import NavBar_Customer from '../components/customer/NavBar_Customer';
import NavBar_Cashier from '../components/cashier/NavBar_Cashier';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar_MainSwitch() {
  const classes = useStyles();

  var isloggedin=localStorage.getItem('isloggedin');
  var current_role=localStorage.getItem('role');
  const {user} = useContext(UserContext);


  if(user!="true" ){
    return (

        <div></div>
      );
}else if(user=="true" && current_role=='store')

{
return(<NavBar_Store></NavBar_Store>);
}
else if(user=="true" && current_role=="cashier"){//if basic return navbar of basic employee
    return (<NavBar_Cashier></NavBar_Cashier>);
}
else if(user=="true"&&current_role=='customer'){//if moderator return navbar of team leader
return (<NavBar_Customer></NavBar_Customer>);
}
else {
    return <div></div>
}

}
