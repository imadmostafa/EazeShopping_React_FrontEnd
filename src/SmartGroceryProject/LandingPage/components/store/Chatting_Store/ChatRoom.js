import firebase from '../../Firebase_Notifications/FirebaseNotifcations';
import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory,

    useParams
} from "react-router-dom";
import Moment from 'moment';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import ScrollToBottom, { useScrollToBottom, useSticky }  from 'react-scroll-to-bottom';
import Icon from '@material-ui/core/Icon';

import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ChatFeed, Message } from 'react-chat-ui';//bubbles chatting ;


import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import ChatRoomTrial from './ChatRoomTrial';//to do the bubble messages in the room;
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    shape: {
        backgroundColor: theme.palette.primary.main,
        width: 100,
        height: 40,
    },
    shapeCircle: {
        borderRadius: '50%',
    },
}));

export default function ChatRoom(props) {
//scroll to bottom
const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
  //
 
    const classes = useStyles();
    const [messages_for_bubbles, setMessagesForBubbles] = useState([]);
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [nickname, setNickname] = useState('');
    const [roomname, setRoomname] = useState('');
    const [newchat, setNewchat] = useState({ roomname: '', nickname: '', message: '', date: '', type: '' });
    const history = useHistory();
    const { room } = useParams();
    let temparray_bubbles = [];
    let temp_message;
    //useScrollToBottom();
    scrollToBottom();
    const rectangle = <div className={classes.shape} />;
    useEffect(() => {
        
        const fetchData = async () => {
            setNickname(localStorage.getItem('nickname'));
            setRoomname(room);
            firebase.database().ref('chats/').orderByChild('roomname').equalTo(roomname).on('value', resp => {
                //get all chats with roomname = to current room name ,to display 


                setChats([]);
                setChats(snapshotToArray(resp));
               

                const touse_arraychats = snapshotToArray(resp);
                temparray_bubbles = [];
                for (let i = 0; i < touse_arraychats.length; i++) {
                    ///  console.log('chat messages',touse_arraychats[i]);
                    let current_item = touse_arraychats[i];
                    let message_id_bubble = 1;
                    if (current_item.nickname == localStorage.getItem('nickname')) {
                        //set id=0;elseid=1
                        message_id_bubble = 0;
                    }
                    temp_message = new Message({ id: message_id_bubble, message: current_item.message, senderName: current_item.nickname, });
                    temparray_bubbles.push(temp_message);

                }
                setMessagesForBubbles(temparray_bubbles);
                console.log('temparray bubbles', temparray_bubbles);
                // useMessagesForBubbles(temparray_bubbles);
            });
        };

        fetchData();
    }, [room, roomname]);

    useEffect(() => {
       
        const fetchData = async () => {
            setNickname(localStorage.getItem('nickname'));
            setRoomname(room);
            firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp2) => {
                setUsers([]);
                const roomusers = snapshotToArray(resp2);
                setUsers(roomusers.filter(x => x.status === 'online'));
            });
        };

        fetchData();
    }, [room, roomname]);

    const snapshotToArray = (snapshot) => {
       
        const returnArr = [];

        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    }

    const submitMessage = (e) => {
        e.preventDefault();
        const chat = newchat;
        chat.roomname = roomname;
        chat.nickname = nickname;
        chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
        chat.type = 'message';

        const newMessage = firebase.database().ref('chats/').push();
        newMessage.set(chat);
        setNewchat({ roomname: '', nickname: '', message: '', date: '', type: '' });
    };

    const onChange = (e) => {
        e.persist();
        setNewchat({ ...newchat, [e.target.name]: e.target.value });
    }

    const exitChat = (e) => {
        const chat = { roomname: '', nickname: '', message: '', date: '', type: '' };
        chat.roomname = roomname;
        chat.nickname = nickname;

        chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
        chat.message = `${nickname} leave the room`;
        chat.type = 'exit';
        const newMessage = firebase.database().ref('chats/').push();
        newMessage.set(chat);

        firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).once('value', (resp) => {
            let roomuser = [];
            roomuser = snapshotToArray(resp);
            const user = roomuser.find(x => x.nickname === nickname);
            if (user !== undefined) {
                const userRef = firebase.database().ref('roomusers/' + user.key);
                userRef.update({ status: 'offline' });
            }
        });

        history.push('/roomlist');
    }


    // /


    if (true) {
        return (
            <ScrollToBottom >
            <div>
           
                  
                <ChatFeed
                    messages={messages_for_bubbles} // Array: list of message objects
                    isTyping={false} // Boolean: is the recipient typing
                    hasInputField={false} // Boolean: use our input, or use your own
                    showSenderName// show the name of the user who sent the message
                    bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                    // JSON: Custom bubble styles
                    bubbleStyles={
                        {


                            text: {
                                fontSize: 20,
                                color: '#000000',
                            },
                            chatbubble: {
                                borderRadius: 90,
                                padding: 20,

                            }
                        }
                    }
                />
                <footer>
                    <form noValidate>
                        <TextField

                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="message"
                            label="Enter message here"
                            name="message"
                            autoComplete="message"
                            autoFocus
                            value={newchat.message}
                            onChange={onChange}
                        />
                    </form>
                    <Button
        variant="contained"
        color="primary"
        onClick={submitMessage}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
                    
                </footer>
              
               

            </div>
            </ScrollToBottom>
        );
    } else if(1==1){
return(
    <ScrollToBottom>
    <ChatRoomTrial messages_firebase={messages_for_bubbles}/>
    </ScrollToBottom>
)
    }
    else
    {


        return (
            <div>
                <Container >

                    <Button variant="primary" type="button" onClick={() => { exitChat() }}>
                        Exit Chat
                                        </Button>

                    {users.map((item, idx) => (


                        item.nickname


                    ))
                    }


                    <Container>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <ScrollToBottom >
                                {chats.map((item, idx) => (
                                    <Grid item xs={12}>

                                        <Badge color="secondary" badgeContent=" " variant="dot">
                                            <div  >

                                                <div key={idx} >
                                                    <Typography color="secondary">

                                                        {item.nickname} at {item.date}



                                                    </Typography>
                                                    <Typography variant="h2" color="initial">


                                                        <span >{item.message}</span>
                                                    </Typography>







                                                </div>
                                            </div>
                                        </Badge>
                                    </Grid>
                                ))}
                            </ScrollToBottom>
                        </Grid>
                    </Container>


                    <footer >
                        <form noValidate>
                            <TextField

                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="message"
                                label="Enter message here"
                                name="message"
                                autoComplete="message"
                                autoFocus
                                value={newchat.message}
                                onChange={onChange}
                            />
                        </form>
                        <Button variant="contained" color="secondary" onClick={submitMessage}>
                            submit
          </Button>

                    </footer>
                </Container>
            </div>
        );





/*<Button variant="contained" color="secondary" onClick={submitMessage}>
                        submit
          </Button>
*/

    }//end of else to return theme of messages 

























}//end of component










