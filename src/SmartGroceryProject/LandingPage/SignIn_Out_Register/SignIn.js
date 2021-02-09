
import { React, useContext } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../components/Contexts/UserContext';
import { RoleContext } from '../components/Contexts/RoleContext';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const { user, setUser } = useContext(UserContext);






  async function makeSignRequest() {
    console.log("entssssered makesignrequest");
    const Datato_Send = {

      email: email,
      password: password

    }
    if (password == '' || email == '') {
      alert('insert a valid value');
      //   history.push('/login');
    }

    let res = await axios.post('http://localhost:8000/api/login', Datato_Send).catch(error => console.log(error));
    //to be changed to include setting items and contexts inside the response promise before .catch error 
    //that way if there is an error no way another would be thrown because res.data was not found ;
    //then else alert('login failed')try again
    /*e.g
    export function getAllPeople() {
      return axios
        .get("/api/getAllPeople")
        .then(response => {
          return response.data;
        })
        .catch(error => {
          return error;
        });
    }*/
    console.log(res);

    if (res.data.success == true) {


      if (res.data.token != null) {
        console.log('loggedin');
        localStorage.setItem('isloggedin', true);
        localStorage.setItem('user_id', res.data.user.id);
        localStorage.setItem('user_name', res.data.user.name);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.user_role.role);
        console.log('user_id', res.data.sucess);
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        setUser(localStorage.getItem('isloggedin'));

      } else {
        alert("login failed");
        history.push('/login');
      }
      if (res.user_role.role == "store") {
        // history.push('/homepage_admin');
      } else if (res.data.user_role.role == "customer") {
        // history.push('/tasks');

      }
    }
    else {
      //history.push('/login');
    }

  }


























  return (
    <Paper>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
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

              onClick={makeSignRequest}
            >
              Sign In
          </Button>
          Sign Up for Your Own Organization !<br></br><br></br>


            <Button

              variant="contained"
              component={Link} to={'/register_store'}>
              Register
              </Button>
            <Grid container>


              <Grid item>

              </Grid>

            </Grid>
          </form>
        </div>

      </Container>
    </Paper>
  );
}
//ReactDOM.render(<SignIn/>,document.getElementById('root'));



