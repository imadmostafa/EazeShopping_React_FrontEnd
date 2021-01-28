import Button from '@material-ui/core/Button'
//Purpose of component : Wait for cashier checkout response to approve that payment recieved and notify the user;
//send push notifications through firebase to cashier ;
//plus first send bill addition to table of bills
//useEffect use for insert from props of total price and customer
import {useState,useEffect} from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import API from '../../API/API';
import firebase from '../../Firebase_Notifications/FirebaseNotifcations';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
 
}));

export default function WaitCashier_Checkout(props) {
  const classes = useStyles();

  const  passedproducts=props.passedproducts;
const[totalprice,setTotalPrice]=useState(props.price);

  const bill_amount = props.price;
const[loading,setLoading]=useState(true);





function calculateTotalPrice(){
  let sum = 0 ;
  for(let i=0;i<passedproducts.length;i++){
      const currentprice=passedproducts[i].price;
sum = sum + (currentprice*passedproducts[i].Count);
  }
  setTotalPrice(sum);
}//end of calc total  price

if(passedproducts!=null){
////calculateTotalPrice();
}




  function addBill_ToBackEnd(){
      const DataToSend={
          bill_amount:totalprice,
          isDone:0
      }
     
     
      API.insertBill(DataToSend).then(res => {
        const result = res.data.bill;
        console.log("RESULT: ", result);
        
       if(res.data.success==false){
      
       }else{
         //infrom cashier lisstener to activate ,to update the list of pending bills in all cashier screens auto
      const newcashier = firebase.database().ref('cashier_listener/');
      const servootadd={cashier:2};
      newcashier.child('cashier').set(res.data.bill.id);//new id of bill , so that listener activated each time 
      //successfully activate need unique id->bill id would do it ;
      //regardless of value ,listener listen to network access
       }
    }).catch(error => console.log("error",error));



  }//end of addBill_ToBackEnd




  useEffect(() => {
    calculateTotalPrice();
    addBill_ToBackEnd();//add bill to backend ,plus inform cashier to update in real time ;
    //now need to wait also so that when cashierchecks in , to change the state , this will happen in vision main shopping
    //and when done press to ,
    

  }, []);





  return (
    <div>
      <LinearProgress color="secondary" style={{
        marginTop:70,
        marginBottom:70
      }}/>
    </div>
  );



}//end of component













