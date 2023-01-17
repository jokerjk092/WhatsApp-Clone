import { React, useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import './login.css'
import axios from "axios";
import ChatContext from '../Context/ChatContext';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


const Login = () => {
  const [Username_input, setInput_username] = useState("");
  const [Password_input, setInput_password] = useState("");
  const [Unique_username, setUnique_username] = useState('');
  const [Unique_password, setUnique_password] = useState('');
  const {state,changeUser,ChatState,changeChats} = useContext(ChatContext)
  const navigate = useNavigate();



  async function validate_user() {

    let value = false;
    
    await axios.request(`/api/getUser/${Username_input}/${Password_input}`).then(function (response) {
      value = response.data.success

    }).catch(function (error) {
      console.error(error);
    });
    if (value === true) {
      // console.log(Username_input)
      changeUser(Username_input)
     
      navigate('/home');
    }

  }


  async function check_username(value)
    {
      await axios.request(`/api/unique_username/${value}`).then(function (response) {
        if(response.data.success==false) 
        {
          setUnique_username(true)
          // console.log(value)
          setInput_username(value)
        }
        else{
          setUnique_username(false)
        }
  
  
      }).catch(function (error) {
        console.error(error);
      });
    }


    async function check_password(value)
    {
      await axios.request(`/api/getUser/${Username_input}/${value}`).then(function (response) {
        if(response.data.success==true) 
        {
          setUnique_password(true)
          // console.log(value)
          setInput_password(value)
        }
        else{
          setUnique_password(false)
        }
  
  
      }).catch(function (error) {
        console.error(error);
      });
      

    }

  return (
    <div className='Login-container'>
    
      <div className='input-tags'>
      <div className='input-tags-text'>Sign-in</div>
        <div className='username-box'><input type='text' placeholder='Enter your username' onChange={(e) => check_username(e.target.value)}></input>
        {Username_input&&Unique_username&&<CheckIcon className='correct-icon' />}
     {Username_input&&!Unique_username&&<ClearIcon className='wrong-icon' />}
     </div>
        <div className='username-box'><input type='text' placeholder='Enter your password' onChange={(e) => check_password(e.target.value)}></input>
        {Password_input&&Unique_password&&<CheckIcon className='correct-icon' />}
     {Password_input&&!Unique_password&&<ClearIcon className='wrong-icon' />}
     </div>
      </div>
      <button onClick={validate_user}>Sign-in</button>
      <Link to='/signup'><p>Register</p></Link>
      <div className='more-text'>Demo username-'thor'<br></br>Demo password-'abcd'</div>
      <div className='more-text'>Demo username-'tony'<br></br>Demo password-'abcd'</div>
    </div>
  )
}

export default Login
