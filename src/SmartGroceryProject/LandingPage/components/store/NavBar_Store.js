import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../Contexts/ThemeContext';
import GroupIcon from '@material-ui/icons/Group';
import { useContext } from 'react';
import {  Typography } from '@material-ui/core';
import { useState } from 'react';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import VideocamTwoToneIcon from '@material-ui/icons/VideocamTwoTone';
import Webcamtrial1 from '../../../../../src/Webcamtrial1';
import AddProject from '../../components/store/AddProject';
import ShowAllMembers from '../../components/store/ShowAllMembers';
import ListProducts_Store from '../../components/store/ListProducts_Store';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Badge from '@material-ui/core/Badge';//forchat icon
import {
  BrowserRouter as Router,
  Switch as RouterSwitch,
  Route
} from 'react-router-dom';
import RoomList from './Chatting_Store/RoomList';
import AddRoom from './Chatting_Store/AddRoom';
import ChatRoom from './Chatting_Store/ChatRoom';
import ChatRoomTrial from './Chatting_Store/ChatRoomTrial';
import EditProduct_Form from './EditProduct_Form';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function NavBar_Store() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { darkState, setDarkState } = useContext(ThemeContext);
  const [statedarkState, setStateDarkState] = useState(false);
  //for change of dark mode switch
  const handleThemeChange = () => {
    setStateDarkState(!statedarkState);
    setDarkState(statedarkState);
  };

  const [open, setOpen] = React.useState(false);

  var store_owner = localStorage.getItem('user_name');
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //<Paper> </Paper>
  return (
    <div>

      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton

              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ flex: 1 }}>

            </Typography>

            <IconButton onClick={handleThemeChange}>
              {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Typography variant="h6" noWrap >
              {store_owner}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => history.push('/homepage_store')}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>

            <ListItem button onClick={() => history.push('/addproject')}>
              <ListItemIcon>
                <CreateNewFolderIcon />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </ListItem>

            <ListItem button onClick={() => history.push('/allmembers')}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="AllMembers" />
            </ListItem>

            <ListItem button onClick={() => history.push('/roomlist')}>
              <ListItemIcon>
                <Badge badgeContent={4} color="secondary">
                  <WhatsAppIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Connect" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => history.push('/machinelearning')}>
              <ListItemIcon>
                <VideocamTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Machine Learning" />
            </ListItem>



            <ListItem button onClick={() => history.push('/logout')}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>

          </List>
        </Drawer>
        <main className={classes.content}>

          <div className={classes.toolbar} />





          <RouterSwitch>


            <Route exact path="/addproject">

              <AddProject />
            </Route>
            <Route exact path="/allmembers">

              <ShowAllMembers />
            </Route>


            <Route exact path="/homepage_store">
              <ListProducts_Store></ListProducts_Store>
            </Route>

            <Route exact path="/editproduct_form">
              <EditProduct_Form></EditProduct_Form>
            </Route>

            <Route exact path="/chatroomtrial">
              <ChatRoomTrial></ChatRoomTrial>
            </Route>

            <Route exact path="/roomlist">
              <RoomList></RoomList>
            </Route>

            <Route exact path="/addroom">
              <AddRoom></AddRoom>
            </Route>

            <Route exact path="/chatroom/:room">
              <ChatRoom></ChatRoom>
            </Route>

            <Route exact path="/machinelearning">
              <Webcamtrial1></Webcamtrial1>
            </Route>



          </RouterSwitch>










        </main>
      </div>

    </div>
  );
}
