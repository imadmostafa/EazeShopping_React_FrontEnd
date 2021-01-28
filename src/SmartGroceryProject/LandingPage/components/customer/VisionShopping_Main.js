import React  from 'react';
import {fade, makeStyles } from '@material-ui/core/styles';
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
import {useState,useEffect} from 'react';
import API from '../API/API';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Grid,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField, GridListTile, ListSubheader,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { PredectionsContext } from '../Contexts/PredectionsContext';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import {useContext,useRef} from 'react'; 

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Link from '@material-ui/core/Link';
import ReviewOrder from './ShoppingVision_Components/ReviewOrder';
import ShoppingExperience from './ShoppingVision_Components/ShoppingExperience';
import WaitCashier_Checkout from './ShoppingVision_Components/WaitCashier_Checkout';
import firebase from '../Firebase_Notifications/FirebaseNotifcations';
const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    cardMedia: {
        margin: "auto",
      },
      cardContent: {
        textAlign: "center",
      },
  }));
  
  const steps = ['Choose Items', 'Review your order', 'Pay at CheckOut'];
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function VisionShopping_Main(){
//PLan: based on button click , take camera prediction and find item in backend by product name return , add to 
//list , if not found give an error , with sound ;
//snackbar
  const [open, setOpen] = React.useState(false);
  const [isapproved_shopping,setIsApprove_Shopping]=useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

//endo of snackbar
const {predectionname,setPredectionName} = useContext(PredectionsContext);
const[purchasedproudcts,setPurchasedProducts]=useState([]);//from backend append directly each added one
const[tryinboolean,setTryingBoolean]=useState(false);
const[iswebcamon,setIsWebCamOn]=useState(true);//true unless set to false 
const[modelpredection_result,setModelPredectionResult]=useState('');
const[purchasedproducts_filtered,setPurchasedProducts_Filtered]=useState([]);
const[productnames_purchased,setProductNames_Purchased]=useState([]);//to keep track of count and modify it
const[totalprice,setTotalPrice]=useState(0);
const[isname_usedBefore,setIsName_UsedBefore]=useState(false);//erroring here
const[servovalue,setServoValue]=useState(0);
const[ultravalue,setUltraValue]=useState(false);
const predectionref=useRef('');

const classes = useStyles();
//beginning for stepper functions
const [activeStep, setActiveStep] = React.useState(0);

const handleNext = () => {
  setActiveStep(activeStep + 1);
};

const handleBack = () => {
  setActiveStep(activeStep - 1);
};
//end of stepper functions

var never_change_predection="never";
function getStepContent(step) {
    switch (step) {
      case 0:
        return <ShoppingExperience pass={purchasedproducts_filtered}/>;
      case 1:
        return<ReviewOrder  price={totalprice} passedproducts={purchasedproducts_filtered}/>;
      case 2:
        return <WaitCashier_Checkout price={totalprice} passedproducts={purchasedproducts_filtered}/>;
      default:
        throw new Error('Unknown step');
    }
  }//pass props to each called component to tell which products finally the customer chose ;
  //pass products data , and fill in cards or whatever in each relative component ;

// /const URL = "https://teachablemachine.withgoogle.com/models/NQjNf69lg/";
//Input Of Machine Learning Camera Module
    const URL = "https://teachablemachine.withgoogle.com/models/nAQUT51Au/";
    let model, webcam, labelContainer, maxPredictions;
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        const flip = true; 
        webcam = new tmImage.Webcam(200, 200, flip); 
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(loop);
        labelContainer = document.getElementById("label-container");
    }
    async function loop() {
        if(iswebcamon){
            if(true){
                try{
                    webcam.update(); // update the webcam frame
                    await predict();
                    window.requestAnimationFrame(loop);
                    if(tryinboolean){
                    }
                }catch(e){
                  console.log('error predecting',e);
                }
                ///window.requestAnimationFrame(loop);//if entered once looped forever lol
               //this is the main command that will run the logic
            }
        }else{
          //  webcam.stop();
        }
    }
    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        var array_predictions=[];
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            const l1=prediction[i].className;
            const l2 = prediction[i].probability.toFixed(2);
            array_predictions.push({name:l1,value:l2});
        }
       //now array_predections need to be sorted to get the hightest probabilty to our state and check threshold
       array_predictions.sort(function(a,b){
        return a.value - b.value;
        }
    );
        array_predictions.reverse();//Ascending order needed
      //  console.log("array ss holding prdections is",(array_predictions));
        console.log('predections context',array_predictions[0].name);
        const newprediction_firebase = firebase.database().ref('predection1/');
                const predection_to_add_firebase={servo1:2};
                newprediction_firebase.child('predection1').set(array_predictions[0].name);
        setModelPredectionResult(array_predictions[0].name);
        setServoValue(array_predictions[0].name);

        predectionref.current=array_predictions[0].name;

        never_change_predection=array_predictions[0].name;
    }//end of predict function
    useEffect(() => {
        //run camera vision 
       init();
       //handleClick();
       //now run hardware listeners for firebase ;
       getset_hardware();
      }, []);  
function getstarted(){
  //  init();
}
//////////////////////////////trying webcam functionalities ,unused methods yet ;
function stopwebcamfunction(){
  //setIsWebCamOn(false);
  window.requestAnimationFrame(loop);
}
function setbooleanup(){
    //setIsWebCamOn(false);
   setTryingBoolean(false);
  }
/////////////////////////////END OF INPUT FROM MACINE LEARNING CODE , STATES READY HERE


//fetch product by name ,specified from machine learning , from backend;
function fetchProduct_ByName_Customer(name){
    setIsName_UsedBefore(false);
   // alert(modelpredection_result);
    console.log('modelprd result before fetch',modelpredection_result);
    API.getProductByName_Customer(name).then(res => {
        const result = res.data;
        console.log("backend result from predection: ", result.product);
        
       if(res.data.success==false){
       alert('failed delete');
       }else{//else if fetch successfully done ,
      const productfetched_frombackend=res.data.product[0];
    const jsontoadd={
id:productfetched_frombackend.id,
name:productfetched_frombackend.name,
store_id:productfetched_frombackend.store_id,
category_id:productfetched_frombackend.category_id,
image_path:productfetched_frombackend.path,
price:productfetched_frombackend.price,
mass:productfetched_frombackend.mass,
description:productfetched_frombackend.description,
category_name:productfetched_frombackend.category_name,
Count:1
    }//servo on here to open for new product to enter physically the cart;
//set servo to open , it will auto close from rasbperry pi python code after inserting the item;
//hardware firebase set servo open 
const newServo = firebase.database().ref('hardware1/');
                const servootadd={servo1:2};
                newServo.child('servo1').set('8');
                //cashier listener activate for cashier to update list of pending bills in realtime
               
//
let currentotalprice=totalprice;
let newtotatlpricetoadd=currentotalprice+jsontoadd.price;


   // setTotalPrice(totalprice+jsontoadd.price);
   setTotalPrice(newtotatlpricetoadd);
    purchasedproudcts.push(jsontoadd);
    productnames_purchased.push(jsontoadd.name);
   // const isname_usedBefore=false;
   let trial_boolean_ispurchasedbefore=false;//better than usestate , cache error it WAS FINALLY!!!
    for(let i = 0; i < purchasedproducts_filtered.length; i++){//loop through all previous names , if before add count
        const currentname=purchasedproducts_filtered[i].name;
        if(jsontoadd.name==currentname){
         trial_boolean_ispurchasedbefore=true;
            purchasedproducts_filtered[i].Count=purchasedproducts_filtered[i].Count+1;
            setIsName_UsedBefore(true);
        }
    }//end of for loop
    if(trial_boolean_ispurchasedbefore){

    }else{
        purchasedproducts_filtered.push(jsontoadd);
    }

console.log('purchased products FILTERED ',purchasedproducts_filtered);
    handleClick();//show snackbar , added success
     console.log('new productlist',purchasedproudcts);
     setPredectionName(!predectionname);//to refresh and re render child components
/*here create filter function to filter products by count number
  also add snackbar ,sounds
  filter_count_products(purchasedproudcts);//function to be created*/

       }
    }).catch(error => console.log("error",error));


}//end of fetchproduct_byname_Customer






//HARDWARE PART WITH FIREBASE ;
function getset_hardware(){//get value of ultrasonic sensorr , if true->fetchdata by name
    firebase.database().ref('hardware2/').orderByChild('ultra1').on('value', (resp) => {
     
        let ultrasonicvalue = [];//.orderByChild('ultra1')
    var username='';
       
         ////alert(resp.val().ultra1);//cooollllllll
         let ultrasonic_from_firebase=resp.val().ultra1;
        // alert(modelpredection_result);
        // fetchProduct_ByName_Customer(modelpredection_result);
       // alert(predectionref.current);
       
         if(ultrasonic_from_firebase=="true"){//fetch data by name
         /* let temp_predection=firebase.database().ref('predection1/').once('value').then((snapshot) => {
            username = (snapshot.val() && snapshot.val().predection1) || 'Anonymous';
          // alert(username);
           // ...
         });*/
         fetchProduct_ByName_Customer(predectionref.current);
////// alert(modelpredection_result);

//then re set to false ; from here 
////////////fetchProduct_ByName_Customer('whatever');//inside fetch , if correct response,set servo open else no
         }else{
            //alert(ultrasonic_from_firebase);
       
         }
       
    });
}

const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
}
//HARDWARE PART ENDS

function callfetch_product(){
  fetchProduct_ByName_Customer(modelpredection_result);
}


return (<div>
 <React.Fragment>
      <CssBaseline />
      <Paper className={classes.paper}>
      <main className={classes.layout}>
       
          <Typography component="h1" variant="h4" align="center">
            Shopping Live
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your visit.
                </Typography>
              
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && activeStep!=2 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={(!isapproved_shopping && activeStep==2)?(true):(false)}
                  >
                    {activeStep === steps.length - 1 ? 
                    (isapproved_shopping?('Done'):('Waiting for Cashier Approval')) : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
          
        
      </main>
      </Paper>
    </React.Fragment>
    <Button color='secondary' onClick={()=>fetchProduct_ByName_Customer(modelpredection_result)}>fetchnow based on name</Button>

    <Snackbar open={open} autoHideDuration={6000} 
     onClose={handleClose}>
  <Alert onClose={handleClose} severity="success">
    New Item Added 
  </Alert>
</Snackbar>

</div>)



/*  $${totalprice}
    <Button color='secondary' onClick={()=>fetchProduct_ByName_Customer(modelpredection_result)}>fetchnow based on name</Button>
    */


}//end of VisionShopping_Main Component class





































