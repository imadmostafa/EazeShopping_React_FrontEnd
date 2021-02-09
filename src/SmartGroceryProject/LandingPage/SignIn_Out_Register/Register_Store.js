import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../components/Contexts/UserContext';
import { RoleContext } from '../components/Contexts/RoleContext';
import { useContext } from 'react';
import axios from 'axios';
import API from '../components/API/API';
import { Alert, AlertTitle } from '@material-ui/lab';
import firebase from '../components/Firebase_Notifications/FirebaseNotifcations';
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

export default function Register_Store() {
  const classes = useStyles();


  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const { user, setUser } = useContext(UserContext);



  async function RegisterStore() {
    //firebase sign up 
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    //end of firebase sign up
    const Datato_Send = {
      name: name,
      email: email,
      password: password

    }
    if (password == '' || email == '' || name == '') {
      alert('insert a valid value');


    }//else if there is an input ->request api login
    else {

      API.Register_Store(Datato_Send).then(res => {
        const result = res.data;
        console.log("RESULT: ", result);
        if (res.data.success == false) {
          <Alert severity="error">This is an error alert — check it out!</Alert>
          //  alert(res.data.message);
        } else {
          history.push('/');
        }
      }).catch(error => console.log("error", error));
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
            Create Store
          </Typography>

          <form className={classes.form} noValidate>
            <TextField

              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Store Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={event => setName(event.target.value)}
            />
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
              onClick={RegisterStore}>
              Create
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
                  component={RouterLink} to={'/'}>
                  Back to Main
              </Button>
              </Grid>



            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}