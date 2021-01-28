
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




export default function ChatNavigation1On1(props){


    const [room, setRoom] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [nickname, setNickname] = useState('');
    const history = useHistory();
const [hardware_trial,setHardware_Trial]=useState('');


    useEffect(() => {
       
      
        fetchData();

    }, []);

//list all users , based on click , create new conversation ,


    
    const fetchData = async () => {
        setNickname(localStorage.getItem('nickname'));
        console.log('entered useeffect ');

        firebase.database().ref('conversations/').orderByChild('conversation_users').equalTo(roomname).on('value', resp => {
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


<Typography variant="h2" color="initial">Room List Component</Typography>

                   {room.map((item, idx) => (
                       
                       <Button key={idx} 
                        
                       onClick={() => { enterChatRoom(item.roomname) }}>{item.roomname}</Button>
                    ))}



<Button variant="contained" color="secondary"  component={RouterLink} to={'/addroom'}>
  Add Room 
</Button>



</div>
);//end of return 




}//end of component















