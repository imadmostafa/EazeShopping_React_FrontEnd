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
import { useContext, useEffect } from 'react';
import axios from 'axios';
import API from '../components/API/API';
import { Alert, AlertTitle } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

export default function Register_Customer() {
  const classes = useStyles();


  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const { user, setUser } = useContext(UserContext);

  //stores available,registered in system
  const initialstore = {//initial dummy data before fetching finishes at didmount
    id: 2,
    name: 'rrr'
  }
  const storesinitial = [//initial dummy data before fetching finishes at didmount
    {
      id: 2,
      name: 'Alomda'
    },
    {
      id: 3,
      name: 'Spinnesy'
    }
  ];

  const [store, setStore] = useState(initialstore);
  const [fetchedstores, setFetchedStores] = useState(storesinitial);

  const handleChangeStore = (event) => {
    setStore(event.target.value);
  };


  function fetchStores() {
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    API.getStores().then(res => {
      const result = res.data.stores;
      console.log("RESULT: ", result);

      if (res.data.success == false) {

      } else {
        setFetchedStores(res.data.stores);
      }
    }).catch(error => console.log("error", error));
  }

  useEffect(() => {
    fetchStores();

  }, []);
  const getStoreIndex = (id, fetchedstores) => {
    for (let i = 0; i < fetchedstores.length; i++) {
      if (fetchedstores[i].id == id) {
        return i;
      }
    }
    return "";
  };
  //




  async function RegisterCustomer() {
    const store_id_tosend = store.id;
    // console.log(store_id_tosend);
    const Datato_Send = {
      name: name,
      email: email,
      password: password,
      store_id: store.id

    }
    if (password == '' || email == '' || name == '') {
      alert('insert a valid value');
    }//else if there is an input ->request api login
    else {
      API.Register_Customer(Datato_Send).then(res => {
        const result = res.data;
        console.log("RESULT: ", result);
        if (res.data.success == false) {
          //  alert(res.data.message);
        } else {
          history.push('/');
        }
      }).catch(error => console.log("error", error));
    }
  }//end of signup request method


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
            Sign Up
          </Typography>

          <form className={classes.form} noValidate>
            <TextField

              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
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
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Available Stores</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={fetchedstores[getStoreIndex(store.id, fetchedstores)]}
                onChange={handleChangeStore}
                label="stores"
              >
                {fetchedstores.map(categ => {
                  return (
                    <MenuItem key={categ.id} value={categ}>{categ.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={RegisterCustomer}>
              Register
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
                  Back
              </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}