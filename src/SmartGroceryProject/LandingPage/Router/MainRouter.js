import {
    BrowserRouter as Router,
    Switch as RouterSwitch,
    Link,
    Route
}from 'react-router-dom';
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Div } from '@tensorflow/tfjs';
import ReactDOM from 'react-dom';
import LandingMain from '../../LandingPage/LandingMain';
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles';
import {Paper,Typography} from '@material-ui/core';
import { Button } from 'react-scroll';
import SignIn from '../SignIn_Out_Register/SignIn';
import Switch from "@material-ui/core/Switch" ;
import {UserContext} from '../components/Contexts/UserContext';
import SignInSide from '../SignIn_Out_Register/SignInW_Photo';
import Register_Customer from '../SignIn_Out_Register/Register_Customer';
import Register_Store from '../SignIn_Out_Register/Register_Store';
import NavBar_MainSwitch from './NavBar_MainSwitch';
import ListProducts_Store from '../components/store/ListProducts_Store';
import {ThemeContext} from '../components/Contexts/ThemeContext';
import { useContext } from 'react';
import { LocalDiningOutlined } from '@material-ui/icons';
import Logout from '../SignIn_Out_Register/Logout';
import Webcamtrial1 from '../../../Webcamtrial1';
import AddProject from '../components/store/AddProject';
import ShowAllMembers from '../components/store/ShowAllMembers';




export default function Start_Router(){
    var isloggedin=localStorage.getItem('isloggedin');
    const [user, setUser] = useState(isloggedin);
    const[darkStateContext,setDarkStateContext]=useState(false);
    const {darkState}=useContext(ThemeContext);
    const palletType=darkState?"dark":"light";
    
    const darkTheme = createMuiTheme({
        palette: {
          type: palletType,
        },
      });

      const handleThemeChange=()=>{
        setDarkStateContext(!darkStateContext);
        };
        

return (
    
<UserContext.Provider value={{user,setUser}}>
<Router >

<ThemeProvider theme={darkTheme}>

           <NavBar_MainSwitch></NavBar_MainSwitch>


            <RouterSwitch>

    
            <Route exact path="/">
            <LandingMain/>
                </Route>
            
                <Route exact path="/register_customer">
                <Register_Customer/>
                </Route>

                <Route exact path="/register_store">
                <Register_Store></Register_Store>
                </Route>
                <Route exact path="/login">
                <SignInSide></SignInSide>
                </Route>

                <Route exact path="/logout">
                    <Logout></Logout>
                </Route>

            </RouterSwitch>

            </ThemeProvider>
        </Router>

        </UserContext.Provider>
       

       
    )



}
//ReactDOM.render(<Main_Router />,document.getElementById('root'));