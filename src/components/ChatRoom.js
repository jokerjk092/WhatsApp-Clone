import { React, useState, useEffect, useContext } from 'react';
import './chatroom.css'
import axios from "axios";
import ChatContext from '../Context/ChatContext';
import MessageContext from '../Context/MessageContext';
import Pusher from 'pusher-js'
import socketIO from 'socket.io-client';
import Smile from '../images/smile.jpg'
import Footer from './Footer';
const socket = socketIO.connect('/');




const ChatRoom = () => {



    const [message, setMessage] = useState('')
    const [count,setCount]=useState(0);
    const [Messages_Arr,setMessages_Arr]=useState([]);

    const { other_state, changeOtherUser, MessagesState, changeMessages } = useContext(MessageContext)
    const { other_username } = other_state
   


    const { state, changeUser, ChatState, changeChats } = useContext(ChatContext)
    const { username } = state;
    const {Chat_Array}=ChatState

   

    useEffect( () => {

       
        axios.request(`/api/get_messages/${username}`).then(function (response) {
            message_extract(response.data)
        }).catch(function (error) {
            console.error(error);
        });


    
    }, [other_username])

    
      useEffect(() => {

        socket.on("received",(data)=>{
            if(data.user===username&&data.other_user===other_username)
            {
                update_message(data)
            }
          
            
        })
    }, [socket,Messages_Arr])


    function message_extract(profils)
    {
     profils?.map((profile) => {
         if (profile.username === other_username)
         {
             setMessages_Arr(profile.chats);
 
         } 
    })
 } 

    function update_message(data)
    {



        if(data.user===username&&data.other_user===other_username)
        {
            let newMes=[...Messages_Arr,data];
            setMessages_Arr(newMes)
        }
        
        
        

    
    }

 
    function post_message() {


        
        axios.post('/api/create_message', {
            user: username,
            other_user: other_username,
            message: message,
            time:new Date().toUTCString(),
            
        })

      socket.emit("send_message",{
        user: other_username,
        other_user: username,
        message: message,
        time:new Date().toUTCString(),
        sent:false
    })

    let new_chat={
        user: username,
        other_user: other_username,
        message: message,
        time:new Date().toUTCString(),
        sent:true
    }
    let new_arr=[...Messages_Arr,new_chat]

    setMessages_Arr(new_arr)


      setMessage("")
  
       
    }
  

  

    return (
        <div className='page-chatroom'>
            <div className='chat-header'>
                <div className='chat-logo'>
                    <img src={Smile} />
                </div>
                <div className='chat-name'>
                    <p>{other_username}</p>
                </div>
            </div>
            <div className='chat-messages' id='scroller'>

                {
                    
                 Messages_Arr?.map((message_block) => {return <p className= {`chat__message ${message_block.sent&&'chat__message__sent'}`}>
                   <span className='chat__name'>{message_block.username}</span>
                   {message_block.message}
                   <span className='chat__timestamp'>{message_block.time}</span>
                    </p>})
                }
                <div id="anchor"></div>

            </div>
            <div className='chat-input-block'>
                <input className='chat-input' value={message} type='text' onKeyDown={(e)=>{if(e.key==='Enter')post_message()}} onChange={(e) => setMessage(e.target.value)}></input>
              
            </div>
           
            
        </div>
    )
}

export default ChatRoom



