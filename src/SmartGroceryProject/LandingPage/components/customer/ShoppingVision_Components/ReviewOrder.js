import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import useSound from 'use-sound';
import {useState,useEffect} from 'react';
import { Divider } from '@material-ui/core';
//import boopSfx from '../../../../../../public/sounds/397353__plasterbrain__tada-fanfare-g.mp3';
//C:\react\react-joi-ia\public\sounds\397353__plasterbrain__tada-fanfare-g.mp3
const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];
/* <Typography variant="h6" gutterBottom className={classes.title} color="secondary">
           Sum : {totalprice} $
          </Typography>
        */
const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function ReviewOrder(props) {
    const  passedproducts=props.passedproducts;
  const classes = useStyles();
const[totalprice,setTotalPrice]=useState(props.price);


function calculateTotalPrice(){
    let sum = 0 ;
    for(let i=0;i<passedproducts.length;i++){
        const currentprice=passedproducts[i].price;
sum = sum + (currentprice*passedproducts[i].Count);
    }
    setTotalPrice(sum);
}//end of calc total  price

if(passedproducts!=null){
////calculateTotalPrice();
}

useEffect(()=>{
calculateTotalPrice();
},[])
///////calculateTotalPrice();
   if(passedproducts!=null){
if(passedproducts[0]==null || passedproducts[0]==undefined){
    return<div>nothing yet
      
    </div>
}else{
   
  return (
    <React.Fragment>
        
      <Typography variant="h6" gutterBottom>
        Shopping summary
      </Typography>
      <List disablePadding>
        {passedproducts.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.category_name} />
            <Typography variant="body2">{product.price}</Typography>
            <Typography variant="body2">x{product.Count}</Typography>
          </ListItem>
        ))}
         <Divider/>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {totalprice}
           
          </Typography>
        </ListItem>
      </List>
     
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
         
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
         
        </Grid>
      </Grid>
    </React.Fragment>
  );

}
   }else{
       return <div></div>
   }

}