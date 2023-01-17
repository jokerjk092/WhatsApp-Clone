import ChatContext from "./ChatContext";
import {React,useState,useEffect} from 'react'

const ChatState = (props) => {
    const [user,setUser]=useState(false)
    const state={username:user}
    const [Chats,setChats]=useState([])
    const ChatState={Chat_Array:Chats}
    
    function changeUser(newUser)
    {
        setUser(newUser)

    }
    function changeChats(newChats)
    {
        setChats(newChats)
    }
  return (
    <ChatContext.Provider value={{state,changeUser,ChatState,changeChats}}>
      {props.children}
      </ChatContext.Provider>
  )
}

export default ChatState
