import { React, useState, useEffect, useContext } from 'react';
import ContactCard from './ContactCard'
import './sidebar.css'
import axios from "axios";
import ChatContext from '../Context/ChatContext';
import MessageContext from '../Context/MessageContext';


const Sidebar = () => {

  const {state,changeUser,ChatState,changeChats} = useContext(ChatContext)
  const {username}=state;
  const {Chat_Array}=ChatState


  const {other_state,changeOtherUser,MessagesState,changeMessages}=useContext(MessageContext)
  
  useEffect(()=>{
  
    axios.request(`/api/get_chats/${username}`).then(function (response) {
      // console.log(response.data)

      changeChats(response.data)
      
  
    }).catch(function (error) {
      console.error(error);
    });
  
  },[])

  function change_message_user(username)
  {
    // console.log(username)
    changeOtherUser(username)
    
  }
  return (
    <div className='page-sidebar'>
    <div className='sidebar-header'><p>Howdy {username}</p></div>
    <div className='sidebar-chats'>
   
  {
    Chat_Array?.map((chat)=>{if(chat.username!=username) return<div onClick={()=>{change_message_user(chat.username)}} ><ContactCard name={chat.username}/></div>})
  } 
    </div>
     
    </div>
  )
}

export default Sidebar
//  
       