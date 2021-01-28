
import {Redirect, useHistory} from 'react-router-dom';
import React from 'react';
import {useContext} from 'react';
import {UserContext} from '../components/Contexts/UserContext';
import firebase from'../components/Firebase_Notifications/FirebaseNotifcations';
export default function Logout(){
    const { user, setUser } = useContext(UserContext);

    const history = useHistory();

    const newServo = firebase.database().ref('openservo/');
    const servootadd = { servo1: 2 };
    newServo.child('servo1').set('3');//now re close the gate , the cart is ready to be used by a new customer

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });

    localStorage.clear();
     setUser("");
    
     //history.push('/');



return (
<Redirect to='/'>
       
</Redirect>
)



/*
 
    */
}

















