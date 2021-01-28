
import firebase from '../../Firebase_Notifications/FirebaseNotifcations';
import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory
  } from "react-router-dom";
import Moment from 'moment';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import {Link as RouterLink} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListingRoomComponent from './ListingRoomsComponent';

export default function RoomList(props){


    const [room, setRoom] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [nickname, setNickname] = useState('');
    const history = useHistory();
const [hardware_trial,setHardware_Trial]=useState('');


    useEffect(() => {
       
      
        fetchData();


        // setinitial_hardware();//set up hardware section in firebase if not set initially;
//type {servo1:0} {ultra1:false}



    }, []);




    function setinitial_hardware(){
        firebase.database().ref('hardware1/').once('value', snapshot => {
            if (snapshot.exists()) {
                
                console.log('user already exists in firebase ');
              
            } else {
                const newServo = firebase.database().ref('hardware1/').push();
                const servootadd={servo1:2};
                newServo.set(servootadd);
                const newUltra = firebase.database().ref('hardware1/').push();
                const ultratoadd={ultra1:false};
                newUltra.set(ultratoadd);
            }
          });



        
    }//end of set hardware function ;

    const fetchData = async () => {
        setNickname(localStorage.getItem('nickname'));
        console.log('entered useeffect ');
        firebase.database().ref('rooms/').on('value', resp => {
           // setRoom([]);
           let temp = snapshotToArray(resp);
           console.log('snapshotoarray yes',temp);
         //  setRoom(snapshotToArray(resp));
         let temparray=[];
         for(let i=0;i<temp.length;i++){
             temparray.push(temp[i]);
         }
         console.log('temparray',temparray);
         setRoom(temp);
           /// setShowLoading(false);
        });

        
         


    };

    const snapshotToArray = (snapshot) => {
        const returnArr = [];

        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    }

    const enterChatRoom = (roomname) => {
        const chat = { roomname: '', nickname: '', message: '', date: '', type: '' };
        chat.roomname = roomname;
        chat.nickname = nickname;
        chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
        chat.message = `${nickname} enter the room`;
        chat.type = 'join';
        const newMessage = firebase.database().ref('chats/').push();
        newMessage.set(chat);

        firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp) => {
            let roomuser = [];
            roomuser = snapshotToArray(resp);
            const user = roomuser.find(x => x.nickname === nickname);
            if (user !== undefined) {
              const userRef = firebase.database().ref('roomusers/' + user.key);
              userRef.update({status: 'online'});
            } else {
              const newroomuser = { roomname: '', nickname: '', status: '' };
              newroomuser.roomname = roomname;
              newroomuser.nickname = nickname;
              newroomuser.status = 'online';
              const newRoomUser = firebase.database().ref('roomusers/').push();
              newRoomUser.set(newroomuser);
            }
        });
    
        history.push('/chatroom/' + roomname);
    }



return (
<div>

<Typography variant="h2" color="initial">Room List </Typography>

                   {room.map((item, idx) => (
                       <div style={{
                           maxWidth:300,
                           
                       }}>
                        <List component="nav" aria-label="main mailbox folders" style={
                        {
 
                        
                        }
                        }>
                        <ListItem button onClick={() => { enterChatRoom(item.roomname) }} >
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.roomname} />
                      </ListItem>
                     
              </List>
              <Divider />
                       <Button key={idx} 
                        
                       onClick={() => { enterChatRoom(item.roomname) }}>{item.roomname}</Button>
                       </div>
                    ))}



<Button variant="contained" color="secondary"  component={RouterLink} to={'/addroom'}>
  Add Room 
</Button>



</div>
);//end of return 




}//end of component















