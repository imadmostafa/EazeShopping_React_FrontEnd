import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {useState,useEffect} from 'react';
import API from '../API/API';
import {  withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core';


// in form/width: '100%',



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    marginLeft:'auto'
  },
  cardmode:{
    maxWidth: 600,
    
    marginLeft:'100px',
    alignContent:'center'
   
    
  },
  form: {
     // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  input: {
    display: 'none',
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
}));

//snack
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//

export default function AddProject() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mass, setMass] = useState('');
  const [price, setPrice] = useState('');


//snack
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

///






  if(window.performance){//on refresh page , re enter authoraizatoin headers to axios 
    if(performance.navigation.type==1){
      let token =localStorage.getItem('token');
      axios.defaults.headers.common['Authorization']='Bearer '+token;//space after beare important
    }
  }

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
//
const mycategoryconstant={
  id:2,
  name:'rrr'
}
const categoriesconstant=[
  {
    id:2,
    name:'food'
  },
  {
    id:3,
    name:'food'
  }
];
  const [category, setCategories] = useState(mycategoryconstant);
  const [fetchedcategories,setFetchedCategories]=useState(categoriesconstant);
  const handleChangeCategory = (event) => {
    setCategories(event.target.value);
  };
//


const[temmpimage,setTempImage]=useState(null);


//upload project
const uploadProduct = async e => {
  const files = e.target.files
  
  const data = new FormData()
  data.append('file', files[0]);
  data.append('name', email);
  data.append('description',password);
  data.append('mass',mass);
  data.append('price',price);
  data.append('category_id',category.id);
  
  setLoading(true)

  API.addProduct(data).then(res => {
    const result = res.data;
    console.log("RESULT: ", result);
    const path=res.data.path;
    const fullpath=path;
  setImage(fullpath);
  setLoading(false)
   if(res.data.success==false){
   alert('failed delete');
   }else{
 // alert('deleted');
 handleClick();//call snack to appear after successfull operation
   }
}).catch(error => console.log("error",error));

console.log('tempimage',temmpimage);
}
//upload project


//
  const uploadImage = async e => {
    const files = e.target.files
    
    const data = new FormData()
    data.append('file', files[0])
   
    data.append('name', 'ddd')
    
    setLoading(true)

    API.insertImage(data).then(res => {
      const result = res.data;
      console.log("RESULT: ", result);
      const path=res.data.file;
      const fullpath="http://localhost:8000/"+path;
    setImage(fullpath);
    setLoading(false)
     if(res.data.success==false){
     alert('failed delete');
     }else{
    alert('deleted');
     }
  }).catch(error => console.log("error",error));

  console.log('tempimage',temmpimage);
  }
//

//fetch categories to put in select as array of json objects
function fetchCategories(){
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
  API.getAllCategories().then(res => {
      const result = res.data.categories;
      console.log("RESULT: ", result);
      
     if(res.data.success==false){

     }else{
      //setCategories(res.data.categories);
      setFetchedCategories(res.data.categories);
     }
  }).catch(error => console.log("error",error));
}

useEffect(() => {
  fetchCategories();

}, []);

const getCategoryIndex=(id,fetchedcategories)=>{
  for(let i=0;i<fetchedcategories.length;i++){
  if(fetchedcategories[i].id==id){
  return i;
  }}
  return "";
  };

  //
  return (
<div>
  <Card className={classes.cardmode}>
 
<Typography variant="h2" color="initial"
style={{marginLeft:'20px'}}
>ADD NEW PRODUCT</Typography>

<Divider></Divider>
{loading ? (
        <div></div>
      ) : (
        <img src={image} style={{ width: '200px',height:'200px' }} />
      )}

<form className={classes.form} noValidate>
          <TextField
            style={{marginRight:'auto',width:'50%'}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="product name"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)}

          />
          <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={fetchedcategories[getCategoryIndex(category.id,fetchedcategories)]}
          onChange={handleChangeCategory}
          label="category"
        >
          {fetchedcategories.map(categ=>{
            return(
             <MenuItem key={categ.id} value={categ}>{categ.name}</MenuItem>
           )
              })}
        </Select>
      </FormControl>
          <TextField
          style={{width:'100%'}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="description"
           
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          
          <TextField
          style={{width:'50%'}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="price"
           
            id="password"
            autoComplete="current-password"
            value={price}
            onChange={event => setPrice(event.target.value)}
          />
          <TextField
           style={{width:'50%'}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="mass"
           
            id="password"
            autoComplete="current-password"
            value={mass}
            onChange={event => setMass(event.target.value)}
          />
            
            <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={uploadImage}>
            Add Product
          </Button>

            
          </form>




    <div className={classes.root}>
      <input
        accept="file"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={uploadProduct}
      />
      <br></br>
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload  Image And Submit
        </Button>
      </label>
      
      
    </div>





    </Card>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
        New Product Added successfully!
        </Alert>
      </Snackbar>
    </div>








  );


// 



}
