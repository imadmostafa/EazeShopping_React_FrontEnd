import React, { useState } from 'react';
import {
    useHistory
} from "react-router-dom";
import firebase from '../../Firebase_Notifications/FirebaseNotifcations';
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


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


export default function AddRoom(){
const classes = useStyles();
    const history = useHistory();
    const [room, setRoom] = useState({ roomname: '' });
    const [showLoading, setShowLoading] = useState(false);
    const ref = firebase.database().ref('rooms/');

    const save = (e) => {
        e.preventDefault();
        setShowLoading(true);
        ref.orderByChild('roomname').equalTo(room.roomname).once('value', snapshot => {
            if (snapshot.exists()) {
                return (
                    <div>
                        {alert('already exists')}
                    </div>
                );
            } else {
                const newRoom = firebase.database().ref('rooms/').push();
                newRoom.set(room);
               // history.goBack();
               history.push('/roomlist');
                setShowLoading(false);
            }
        });
    };

    const onChange = (e) => {
        e.persist();
        setRoom({...room, [e.target.name]: e.target.value});
    }

    return (
        <div>
            
            <form className={classes.form} noValidate>
          <TextField
          
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Enter Room Name"
            name="roomname"
            autoComplete="roomname"
            autoFocus
            value={room.roomname}
            onChange={onChange}
          /> 
          </form>
          <Button variant="contained" color="secondary" onClick={save}>
            save
          </Button>
        </div>
    );


}//end of component




































