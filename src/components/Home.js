import { React, useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import ChatRoom from './ChatRoom';
import './home.css';
import Footer from './Footer';


const Home = () => {



  
  return (
    <div className='Home'>
     <Sidebar />
      <ChatRoom />
      
    </div>
  )
}

export default Home
