import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import  {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {UserContext} from '../components/Contexts/UserContext';
import {RoleContext} from '../components/Contexts/RoleContext';
import {useContext } from 'react';
import axios from 'axios';
import API from '../components/API/API';
import {  AlertTitle } from '@material-ui/lab';
import firebase from '../components/Firebase_Notifications/FirebaseNotifcations';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/internet-1593358_1920.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//snack
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//

export default function SignInSide() {
  const classes = useStyles();

  
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  


  const { user, setUser } = useContext(UserContext);

//Firebase chatting
const [credss, setCredss] = useState('');
const ref = firebase.database().ref('users/');
//



async function makeSignRequest2(){
  //sign in with firebase auth
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  //end of sign in with firebase auth
  
    const Datato_Send = {

        email: email,
        password:password

      }
      if(password=='' || email==''){
        alert('insert a valid value');
        

      }//else if there is an input ->request api login
      else{

        API.SignIn(Datato_Send).then(res => {
            const result = res;
            console.log("RESULT: ", result);
            
           if(res.data.success==false){
             setErrorMessage_ToShow(res.data.message);
           handleClick();
              //  alert(res.data.message);



           }else{
            localStorage.setItem('isloggedin',true);
            localStorage.setItem('user_id',res.data.user.id);
            localStorage.setItem('user_name',res.data.user.name);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('role',res.data.user_role.role);
            localStorage.setItem('store_id',res.data.user_role.store_id);
            localStorage.setItem('image_path',res.data.user.image_path);
            console.log('user_name',res.data.user.name);
            let token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
            setUser(localStorage.getItem('isloggedin'));
            //check roles,navigate accordingly



//Firebase login
//setCreds({'nickname':'imadssss'});//wrong syntax ;
setCredss(localStorage.getItem('user_name'));
const creds={'nickname':localStorage.getItem('user_name')};


console.log('credss',creds);

//

            if(res.data.user_role.role=="store"){
              ref.orderByChild('nickname').equalTo(creds.nickname).once('value', snapshot => {
                if (snapshot.exists()) {
                    localStorage.setItem('nickname', creds.nickname);
                    console.log('user already exists in firebase ');
                  
                } else {
                    const newUser = firebase.database().ref('users/').push();
                    console.log('cred',creds);
                    newUser.set(creds);
                    localStorage.setItem('nickname', creds.nickname);
                   console.log('use created in firebase');
                }
              });
              
                history.push('/homepage_store');//intial page showing products for store_owner
               }else if(res.data.user_role.role=="customer"){
                 history.push('/visionmain_shopping');//initial page to show for customers 
               }else if(res.data.user_role.role=="cashier"){
                history.push('/listbills_cashier');
               }
           }
        }).catch(error => console.log("error",error));
      }
}



//snack
const [open, setOpen] = React.useState(false);
const[errormessage_toshow,setErrorMessage_ToShow]=useState('error signing in');
const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

///





  async function makeSignRequest() {
console.log("entssssered makesignrequest");
    const Datato_Send = {

        email: email,
        password:password

      }
     if(password=='' || email==''){
       alert('insert a valid value');
    //   history.push('/login');
     }

    let res = await axios.post('http://localhost:8000/api/login', Datato_Send).catch(error => console.log(error));
    console.log(res);
    if(res.data.success==true){
    if(res.data.token!=null){
        console.log('loggedin');
    localStorage.setItem('isloggedin',true);
    localStorage.setItem('user_id',res.data.user.id);
    localStorage.setItem('user_name',res.data.user.name);
    localStorage.setItem('image_path',res.data.user.image_path);
    localStorage.setItem('token',res.data.token);
    localStorage.setItem('role',res.data.user_role.role);
    console.log('user_id',res.data.sucess);
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
    setUser(localStorage.getItem('isloggedin'));
    }else{
        alert("login failed");
        history.push('/login');
    }
    //check role , to navigate accordingly
   if(res.data.user_role.role=="store"){
    history.push('/');
   }else if(res.data.user_role.role=="customer")
   {
     history.push('/productsshow_customer');

   }
  }
  else if(res.data.user_role.role=="cashier"){
    //history.push('/login');
  }

}












  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
         
          <form className={classes.form} noValidate>
          <TextField
          
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
            
            <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={makeSignRequest2}>
            Sign In
          </Button>

            <Grid
  container
  direction="column"
  justify="space-evenly"
  alignItems="flex-start"
  spacing={2}
>
              <Grid item>
              <Button         
          component={RouterLink} to={'/register_store'}>
             Register New Grocery Store
              </Button>
              </Grid>
              
              <Grid item >
              <Button
          component={RouterLink} to={'/register_customer'}>
             Register as Customer
              </Button>
              </Grid>

            </Grid>
          </form>
        </div>
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
       {errormessage_toshow}
        </Alert>
      </Snackbar>

    </Grid>
  );
}