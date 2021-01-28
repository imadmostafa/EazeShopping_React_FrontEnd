import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import API from '../../components/API/API';
import {useState,useEffect} from 'react';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {
      width:'50%'
  },
  avatar: {
    height: 200,
    width: 200,
    
  },
  input: {
    display: 'none',
  },
}));

const ProfileCustomer = ({ className, ...rest }) => {
  const classes = useStyles();



  const [image, setImage] = useState(null);
const uploadImage = async e => {
    const files = e.target.files
    
    const data = new FormData()
    data.append('file', files[0])
   
    data.append('name', 'ddd')
    
   
    API.insertImage(data).then(res => {
      const result = res.data;
      console.log("RESULT: ", result);
      const path=res.data.file;
      const fullpath=path;
    setImage(fullpath);
     if(res.data.success==false){
     alert('failed delete');
     }else{
   // alert('deleted');
     }
  }).catch(error => console.log("error",error));

  //"http://192.168.0.102:8000/storage/uploads/qKQOmZJ7W94qNES95VIq95ILh9fvOMwYi7VMOFw7.jpg"
  }
  return (
      <div>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={image}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>

      </CardActions>
    </Card>
    


      <Button
                variant="contained"
                component="label"
                color="primary"
                size="sm"
                style={{
                    width:'50%'
                }}
            >
                Change Profile
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={uploadImage}
                />
            </Button>
      </div>

  );
};



export default ProfileCustomer;