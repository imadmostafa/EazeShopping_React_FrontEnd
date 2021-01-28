import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { ChatFeed, Message } from 'react-chat-ui';
import {useState,useEffect} from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import  Button  from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const ChatRoomTrial = (props) => {
  const classes = useStyles();
  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();

  const [messages,setMessages]=useState([
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
      senderName:'imad 2020',
    }), // Gray bubble
    new Message({ id: 0, message: "I'm you -- the blue bubble!" ,senderName:'alomda 2020',}),
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
    new Message({ id: 1, message: "I'm you -- the blue bubble!",senderName:'alomda', }),
    new Message({ id: 1, message: "I'm you -- the blue bubble!" ,senderName:'alomda',}), // Blue bubble
  ] )
//implies id:0 -> user sending , no username needed , if id:1,other message implies third senderName will show 
const messages_firebase=props.messages_firebase;

  return (
      <div>
          <Button onClick={scrollToBottom}>Click me to scroll to bottom</Button>
         <ChatFeed
      messages={messages} // Array: list of message objects
      isTyping={false} // Boolean: is the recipient typing
      hasInputField={false} // Boolean: use our input, or use your own
      showSenderName// show the name of the user who sent the message
      bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
      // JSON: Custom bubble styles
      bubbleStyles={
        {
            
              
          text: {
            fontSize: 20,
           color:'#000000',
          },
          chatbubble: {
            borderRadius: 90,
            padding: 20,
            
          }
        }
      }
    />
      </div>
  );
}

export default ChatRoomTrial;