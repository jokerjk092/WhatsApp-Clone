import { React, useState, useEffect } from 'react';
import axios from "axios";
import './signup.css'
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Signup = () => {
    const [Username_input, setInput_username] = useState("");
    const [Password_input, setInput_password] = useState("");
    const [Unique_username, setUnique_username] = useState('');
    const navigate = useNavigate();

    async function create_user()
    {

      if(Unique_username==true&&Password_input.length!=0)
    {
        // console.log("called")
        await axios.post('/api/create_user',{
            new_username:Username_input,
            new_password:Password_input,
            })
            // navigate('/');
         }

    }

   async function check_username(value)
    {
       
      await axios.request(`/api/unique_username/${value}`).then(function (response) {
        if(response.data.success==true) 
        {
          setUnique_username(true)
          setInput_username(value)
        }
        else{
          setUnique_username(false)
        }
  
  
      }).catch(function (error) {
        console.error(error);
      });
      

    }
  return (
    <div className='signup-container'>
    <div className='signup-input-tag'>
    <div className='input-tags-text'>Sign-up</div>
    
     <div className='username-box'> <input type='text' placeholder='Enter your username' onChange={(e)=>check_username(e.target.value)}></input>
     {Username_input&&Unique_username&&<CheckIcon className='correct-icon' />}
     {Username_input&&!Unique_username&&<ClearIcon className='wrong-icon' />}
     </div>


      <input type='text' placeholder='Enter your password' onChange={(e)=>setInput_password(e.target.value)}></input>
     
      </div>
      <button onClick={create_user}>Register</button>
      <Link to='/login'><p>Sign-in</p></Link>
    </div>
  )
}

export default Signup
