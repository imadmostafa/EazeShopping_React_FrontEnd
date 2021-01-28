import React  from 'react';
import {fade, makeStyles } from '@material-ui/core/styles';//for cards fading appearing
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

import DeleteIcon from '@material-ui/icons/Delete';
import {
  Grid,

  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
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

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
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
  


/*<CardHeader
              
               
              title={product.name}
             
            />*/



export default function ShoppingExperience(props){
    //pass array of purchasedproducts as props
const  pass=props.pass;
    const classes = useStyles();

const[purchasedproducts,setPurchasedProducts]=useState(pass);



    function shoppingexperience(purchasedproudcts){
       
        return(
            <div>
                <Grid 
                container 
                spacing={4}
                direction="row"
  justify="flex-start"
  alignItems="center"
                >
                  
              
         {purchasedproudcts.map((product) => (
             <div>
              <Grid item xs={12} sm={11} key={product.id}>
              <Card >
              
                <CardMedia
                onClick={()=>alert('ss')}
                className={classes.cardMedia}
                  image={product.image_path}
                  style={{ width: "230px", height: "230px" }}
                />
                
                <CardContent className={classes.cardContent}>
                 
                Product Name: <Typography color="secondary"> {product.name}</Typography> 
                
                Category : {product.category_name}
                <Typography color="secondary"> {product.price}$ </Typography>
                Count: x
                <Typography color="secondary"> {product.Count} </Typography>
                </CardContent>
               
                
              </Card>
            </Grid>
    
    </div>
        ))}
          </Grid>
        </div>
    )
    }
    
if(pass[0]==null || pass[0]==undefined){
    return<Typography variant="h2" style={{
      alignSelf:'center'
    }} >
Happy Shopping ! Add An Item to Start
    </Typography>
}else{
   
     return(<div>
    {shoppingexperience(pass)}
    </div>)
}


}







