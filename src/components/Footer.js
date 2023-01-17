import { React, useState, useContext } from 'react';
import FooterIcons from './FooterIcons';
import './footer.css'
import axios from "axios";
import ChatContext from '../Context/ChatContext';
import MessageContext from '../Context/MessageContext';


const Footer = () => {const {state,changeUser,ChatState,changeChats} = useContext(ChatContext)
const {username}=state;
const {Chat_Array}=ChatState

const {other_state,changeOtherUser,MessagesState,changeMessages}=useContext(MessageContext)

function change_message_user(username)
  {
    // console.log(username)
    changeOtherUser(username)
    
  }
  return (
    <div className={`footer hide-footer ${!username&&"hide"}`}>
     {
    Chat_Array?.map((chat)=><div onClick={()=>{change_message_user(chat.username)}} ><FooterIcons name={chat.username}/></div>)
  }
    </div>
  )
}

export default Footer
