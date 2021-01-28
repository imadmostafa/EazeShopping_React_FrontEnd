import React, { useState } from 'react';
import {Grid, Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MuiAlert  from '@material-ui/lab/Alert';
import {useHistory} from 'react-router-dom';
import API from '../API/API';
import axios from "axios";
import { CssBaseline } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {useParams,useLocation} from 'react-router-dom';

  const useStyles = makeStyles((theme) => ({

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

  formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
  selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));
  // Snackbar Alert function
  function EAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default function EditProduct() {
  const classes = useStyles();
  const history = useHistory();
  const location =useLocation();
  console.log(location.state.product); //
  const[producttoedit,setProducToEdit]=useState(location.state.product);
 





  const categories = JSON.parse(localStorage.getItem('categories'));
  const locations = JSON.parse(localStorage.getItem('categories'));

  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const [selectedLocationId, setSelectedLocationId] = useState(locations[0].id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [trade_for, setTrade_for] = useState('');
  const [image_url, setImage_url] = useState('');
  const [loading, setLoading] = useState(false);

  //errors from backend
  const [errorMsg, setErrorMsg] = useState('');
  const [errorDetail, setErrorDetail] = useState('');
  //validation errors
  const [isValError, setIsValError] = useState(false)
  const [valErrorMessages, setValErrorMessages] = useState([])
  
  const onCategoryChange = (event) => {
    // event.target.value will be the id of the current selected category
    setSelectedCategoryId(parseInt(event.target.value));
  }
  const onLocationChange = (event) => {
    // event.target.value will be the id of the current selected location
    setSelectedLocationId(parseInt(event.target.value));
  }

  //SnackBar settings
  const [open, setOpen] = React.useState(false);
  const handleError = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function EditItemRequest(){
    

    let token =localStorage.getItem('token');
    axios.defaults.headers.common['Authorization']='Bearer '+token;
    axios.defaults.headers.common[ "Content-Type"]= "application/json";
   
    const itemData = {
      name: name,
      description: description,
      condition: condition,
      trade_for: trade_for,
      
      category_id: selectedCategoryId,
      main_product_image_path: image_url,
      };

      let errorList = []
      if(name === ""){
        errorList.push("Please enter an Item's Name")
      }
      if(description === ""){
        errorList.push("Please enter the Item's Detail")
      }
      if(condition === ""){
        errorList.push("Please enter the Item's condition")
      }
      if(trade_for === ""){
        errorList.push("Please enter the Item's Detail")
      }
      if(selectedLocationId === ""){
        errorList.push("Please Select a Location")
      } 
      if(selectedCategoryId === ""){
        errorList.push("Please Select a Category")
      }
      if(image_url === ""){
        errorList.push("Please Choose an Image for this item")
      }

    if(errorList.length < 1){
    API.updateMyProduct(itemData).then(res => {
      if(res.data.success === false){
          return (
          <MuiAlert severity="error">{res.data.message}</MuiAlert>
          )
        }else{
        history.push('/myitems')
        }
      }).catch(err => {
        if (err.response) {
          // client received an error response like (5xx, 4xx)
         
          handleError();
        } else {
          // client never received a response, or request never left, or anything else
          setErrorMsg('Error');
          setErrorDetail('Something went Wrong, Check your connection and try again later!');
          handleError();
        }
      });
    }else{
      setValErrorMessages(errorList)
      setIsValError(true)
    }
  }

  const upload = async (files) => { 
    let token =localStorage.getItem('token');
    axios.defaults.headers.common['Authorization']='Bearer '+token;
    axios.defaults.headers.common[ "Content-Type"]= "multipart/form-data";

    if (files === null) return;

    const data = new FormData();
    data.append('main_product_image_path', files[0]);
    setLoading(true);
    const response = await API.uploadImage(data);
    console.log(response);
    setImage_url(response.data.url);
      setLoading(false);

  }


  return (
    <React.Fragment>
    <CssBaseline />
      
      <main className={classes.layout}>
      <Paper className={classes.paper}>

      <Typography variant="h6" gutterBottom>
        Item to Edit
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Item Name"
            fullWidth
            autoComplete="given-name"
            value={name}
            onChange={event => setName(event.target.value)}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="condition"
            name="condition"
            label="Condition"
            fullWidth
            autoComplete="condition"
            value={condition}
            onChange={event => setCondition(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="trade_for"
            name="trade_for"
            label="Trade for "
            fullWidth
            autoComplete="trade_for"
            value={trade_for}
            onChange={event => setTrade_for(event.target.value)}
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Item description"
            fullWidth
            autoComplete="Item-description"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="location-native-simple" >Location</InputLabel>
            <Select
              native
              value={selectedLocationId} 
              onChange={onLocationChange}
            >
            {locations.map((item, i) => (
              <option value={item.id} key={i}>
                {item.name}
              </option>
            ))}
          
              </Select>
          </FormControl>
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="category-native-simple" >Category</InputLabel>
            <Select
              native
              value={selectedCategoryId} 
              onChange={onCategoryChange}
            >
             {categories.map((item, i) => (
              <option value={item.id} key={i}>
                {item.name}
              </option>
            ))}
           
          </Select>
        </FormControl>
        </Grid>

        <Grid item xs={12}>
        <div className={classes.root}>
        
          <Grid item xs={12} >
            <label htmlFor="contained-button-file">
              <input
                style={{ display: 'none' }} 
                accept="file"
                id="contained-button-file"
                multiple
                type="file"
                onChange={e=>upload(e.target.files)} 
              />
              <Button
                variant="contained" 
                color="inherit" 
                component="span"
                >
                  Change the Image
              </Button>
            </label>
          </Grid>
        <br />
        <Grid item xs={12}>
          
          {loading ? (
            <CircularProgress />
          ) : (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img src={image_url} style={{ width: '300px',lenght:'300px' }} />
          )}
        </Grid>
        </div>
        <div>
            {isValError && 
              <Alert severity="error">
                  {valErrorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
        </div>
        <Grid item xs={12}>
       <Button variant="contained" color="primary" component="span" onClick={EditItemRequest}>
       Edit Item
       </Button>
       </Grid>
      </Grid>
      </Grid>
      </Paper>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <EAlert onClose={handleClose} severity="error">
        {errorMsg} : {errorDetail} 
        </EAlert>
      </Snackbar>

      </main>
    </React.Fragment>
  );
}