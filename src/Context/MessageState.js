import MessageContext from "./MessageContext";
import {React,useState,useEffect} from 'react'

const MessageState = (props) => {
    const [other_user,setother_User]=useState(false)
    const other_state={other_username:other_user}
    const [Messages,setMessages]=useState([])
    const MessagesState={Messages_Array:Messages}
    
    function changeOtherUser(newUser)
    {
        setother_User(newUser)

    }
    function changeMessages(newMessages)
    {
        setMessages(newMessages)
    }
  return (
    <MessageContext.Provider value={{other_state,changeOtherUser,MessagesState,changeMessages}}>
      {props.children}
      </MessageContext.Provider>
  )
}

export default MessageState
