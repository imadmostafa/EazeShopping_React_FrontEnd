//re updateuseffect state based on firebase input notifications change ;
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import API from '../API/API';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
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

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));






export default function ListBills_Cashier(props) {
  const classes = useStyles();
  const [bills_undone, setBillsUnDone] = useState([]);
  const [searchbar, setSearchBar] = useState(props.searchvalue);//for searching the customers

  //snack bar queue mode 
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  //end of snack bar queue mode functions



  function fetchBills_UnDone() {
    API.getBillsCashier_UnDone().then(res => {
      const result = res.data;
      console.log("RESULT: ", result);

      if (res.data.success == false) {
        alert('failed delete');
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
      ////alert(resp.val().ultra1);//cooollllllll
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









































