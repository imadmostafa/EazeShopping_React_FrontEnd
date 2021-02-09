import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import API from '../API/API';
import { useState, useEffect } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import firebase from '../Firebase_Notifications/FirebaseNotifcations';
import { Avatar } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));




export default function ListBills_Cashier(props) {
  const classes = useStyles();
  const [bills_undone, setBillsUnDone] = useState([]);
  const [searchbar, setSearchBar] = useState(props.searchvalue);//for searching the customers, get from appbar parent


  //snack bar 
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };//end of snack bar queue mode functions



  function fetchBills_UnDone() {
    API.getBillsCashier_UnDone().then(res => {
      const result = res.data;
      console.log("RESULT: ", result);

      if (res.data.success == false) {
        alert('failed fetching');
      } else {

        setBillsUnDone(res.data.bills);

        //  handleClick();//for snack bar
      }
    }).catch(error => console.log("error", error));
  }




  useEffect(() => {

    fetchBills_UnDone();
    setFirebase_Listener();
    console.log(bills_undone);
  }, []);


  function setFirebase_Listener() {
    firebase.database().ref('cashier_listener/').orderByChild('cashier').on('value', (resp) => {
      let ultrasonicvalue = [];//.orderByChild('ultra1')

      fetchBills_UnDone();

      let ultrasonic_from_firebase = resp.val().cashier;
      if (ultrasonic_from_firebase == "true") {//fetch data by name
        //alert('new bill inserted cool');

      } else {
        // alert(ultrasonic_from_firebase);

      }

    });
  }


  function approve_bill(id) {
    const Datato_Send = {

      id: id

    }
    API.setBillDone(Datato_Send).then(res => {
      const result = res.data;
      console.log("RESULT: ", result);
      //open servo motor for customer 
      const newServo = firebase.database().ref('openservo/');
      const servootadd = { servo1: 2 };
      newServo.child('servo1').set('8');


      if (res.data.success == false) {
        alert('failed delete');
      } else {
        handleClick();//for snack bar
        const formattedlist = bills_undone.filter(item => item.id !== id);
        setBillsUnDone(formattedlist);

      }
    }).catch(error => console.log("error", error));
  }//end of approve bill method




  return (

    <React.Fragment>
      <Title>Pending Shoppings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Photo</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Amount $</TableCell>
            <TableCell>Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {bills_undone.filter(name => name.customer_name.includes(props.searchvalue)).map((row) => (
            <TableRow key={row.id} >
              <TableCell>
                <Avatar

                  src={row.image_path}
                />
              </TableCell>

              <TableCell>{row.created_at}</TableCell>
              <TableCell>{row.customer_name}</TableCell>
              <TableCell>{row.bill_amount}</TableCell>
              <IconButton color='secondary' onClick={() => {

                approve_bill(row.id);
              }}>
                <CheckIcon></CheckIcon>
              </IconButton>


            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>


      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Customer Bill Paid Successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>

  );
}









































