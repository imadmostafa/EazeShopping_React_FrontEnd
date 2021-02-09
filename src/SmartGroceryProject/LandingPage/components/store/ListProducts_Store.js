import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';//for cards fading appearing
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState, useEffect } from 'react';
import API from '../API/API';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Popover from '@material-ui/core/Popover';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
import {
  Grid,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  paddelements: {
    marginLeft: 140
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    flex: 1,

    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  },
  root: {
    maxWidth: 345,
    marginLeft: 240
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  fabButton: {
    position: 'absolute',

    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  margin: {
    margin: theme.spacing(1),
  },
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {

    marginLeft: 'auto'
  }
}));

//snack
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//


export default function ListProducts_Store() {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [fetchedproducts, setFetchedProducts] = useState('');
  const [fetchedimages, setFetchedImages] = useState('');

  const [tempid, settempid] = useState('');

  const history = useHistory();
  const [productData, setProductData] = useState({});
  const [filter, setFilter] = useState("");
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

  //categories
  const mycategoryconstant = {
    id: 0,
    name: 'rrr'
  }
  const categoriesconstant = [
    {
      id: 2,
      name: 'food'
    },
    {
      id: 3,
      name: 'food'
    }
  ];
  const [category, setCategories] = useState(mycategoryconstant);
  const [fetchedcategories, setFetchedCategories] = useState(categoriesconstant);
  const handleChangeCategory = (event) => {
    setCategories(event.target.value);
  };
  const getCategoryIndex = (id, fetchedcategories) => {
    for (let i = 0; i < fetchedcategories.length; i++) {
      if (fetchedcategories[i].id == id) {
        return i;
      }
    }
    return "";
  };
  //

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


  //pop over 
  const [anchorElPopover, setAnchorElPopover] = React.useState(null);

  const handleClickPopover = (event) => {
    setAnchorElPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorElPopover(null);
  };

  const openPopover = Boolean(anchorElPopover);
  const id = openPopover ? 'simple-popover' : undefined;
  const [currentdescriptionPopover, setCurrentDescriptionPopover] = useState('');
  //





  useEffect(() => {
    fetchcategories_frombackend();
    API.getAllProductsWithImages().then(function (response) {
      const data = response;
      const results = data.data.products;
      const newProducts = {};
      results.forEach((product, index) => {
        newProducts[index + 1] = {
          id: index + 1,
          name: product.name,
          sprite: product.path,
          category_name: product.category_name,
          created_at: product.created_at,
          id_product: product.id,
          description: product.description,
          store_id: product.store_id,
          mass: product.mass,
          price: product.price,
          product_id: product.id
        };
      });
      setProductData(newProducts);
      console.log('data fetched', newProducts);
    });
    //also fetch categories; 

  }, []);

  

  //here we will add context of search input to handleSearchChange,so that it will be handled successfully
  //from 2 different components
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  function fetchcategories_frombackend() {
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    API.getAllCategories().then(res => {
      const result = res.data.categories;
      console.log("RESULT: ", result);

      if (res.data.success == false) {
        alert('failed fetching');
      } else {
        //setCategories(res.data.categories);
        //add option all with id of 0 ,for select any mapping all 
        let tempholder_categories = res.data.categories;
        tempholder_categories.unshift({ id: 0, name: 'Any' });//this will add to first of arry and push
        console.log('muttaed categ', tempholder_categories);
        setFetchedCategories(tempholder_categories);
        localStorage.setItem('categories', JSON.stringify(res.data.categories));
      }
    }).catch(error => console.log("error", error));
  }

  //getproductcard function
  const getProductCard = (productId) => {
    const { id, name, sprite, category_name, created_at, id_product, description } = productData[productId];
    return (
      <Grid item xs={12} sm={4} key={productId}>
        <Card >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {id}
              </Avatar>
            }
            action={
              <IconButton aria-describedby={id} aria-label="settings"
                onClick={(e) => {
                  handleClickPopover(e);
                  let temp = description;
                  setCurrentDescriptionPopover(temp);
                }}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={name}
            subheader={created_at}
          />

          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "330px", height: "300px" }}
          />

          <CardContent className={classes.cardContent}>
            Name: <Typography color="secondary"> {name} </Typography>
            <br></br>
        Category Name: {category_name}
          </CardContent>

          <Fab color="primary" aria-label="edit" display='flex' flexGrow={0}

            onClick={() => {
              history.push({
                pathname: '/editproduct_form',
                search: '?query=abc',
                state: { product: productData[productId] }//pass product selected to the edit component
              });
            }}
          >
            <EditIcon />
          </Fab>

          <Fab color="secondary" aria-label="edit"
            onClick={() => {
              var v = { id_product };
              deleteproduct(v);
              console.log('pressed', v);
            }}
          >
            <DeleteIcon />
          </Fab>

        </Card>

      </Grid>
    );
  };

  //
  function deleteproduct(id) {
    var parsed = id.id_product;
    API.deleteproduct(parsed).then(res => {
      const result = res;
      console.log("RESULT: ", result);
      if (res.data.success == false) {
        alert('failed delete');
      } else {//else if fetch successfully done ,
        //alert('deleted');
        handleClick();
        console.log(productData[1].name);
        const newproductlist = Object.values(productData);
        console.log('newlist', newproductlist);
        const formattedlist = newproductlist.filter(item => item.id_product !== parsed);
        console.log('formatted', formattedlist);
        setProductData(formattedlist);
      }
    }).catch(error => console.log("error", error));

  }//end of deleteproduct by id


  if (productData == null) {
    return (<LinearProgress color="secondary" />)
  }
  else {


    return (
      <div >
        <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            className={classes.searchInput}
            onChange={handleSearchChange}
            label="search"
            variant="standard"
          />
          <IconButton component={RouterLink} to={'/addproject'}>
            <AddCircleIcon />
          </IconButton>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={fetchedcategories[getCategoryIndex(category.id, fetchedcategories)]}
              onChange={handleChangeCategory}
              label="category"
            >
              {fetchedcategories.map(categ => {
                return (
                  <MenuItem key={categ.id} value={categ}>{categ.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>

        </div>

        {productData ? (
          <Grid container spacing={2} className={classes.pokedexContainer}>

            {

              category.id == 0 ? (Object.keys(productData).map(
                (productId) =>
                  productData[productId].name.includes(filter) &&

                  getProductCard(productId)
              )) : (Object.keys(productData).map(
                (productId) =>
                  productData[productId].name.includes(filter) &&
                  productData[productId].category_name.includes(category.name) &&
                  getProductCard(productId)
              ))




            }
          </Grid>
        ) : (

            <LinearProgress color="secondary" />

          )}

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Deleted successfully!
        </Alert>
        </Snackbar>
        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorElPopover}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}>{currentdescriptionPopover}</Typography>
        </Popover>
      </div>
    )


  }


























}
