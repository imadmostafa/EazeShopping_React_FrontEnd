import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './Header';
import FeaturesGrocery from './FeaturesGrocery';
//C:\react\react-joi-ia\public\assets\12.jpg
///C:\react\react-joi-ia\public\assets\shopping-cart-laptop-online-shopping-delivery-service-concept_49229-86.jpg
// /C:\react\react-joi-ia\public\assets\onlineshoppginwallpaper1.jpg
//C:\react\react-joi-ia\public\assets\pexels-photo-5632388.jpeg
// /C:\react\react-joi-ia\public\assets\pexels-photo-264547.jpeg
const useStyles = makeStyles((theme) => ({
   // //C:\react\react-joi-ia\public\assets\internet-1593358_1920.jpg
   //C:\react\react-joi-ia\public\assets\4111520f6b52cb00693de50273b5d57a.jpg
   //C:\react\react-joi-ia\public\assets\th.jpg
   //C:\react\react-joi-ia\public\assets\shutterstock_170420135.jpg
  root: {//C:\react\react-joi-ia\public\assets\ecommerce-3563183.jpg
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/shutterstock_170420135.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
export default function LandingMain() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
     <FeaturesGrocery></FeaturesGrocery>
    </div>
  );
}
