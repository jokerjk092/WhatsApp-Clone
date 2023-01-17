import { React, useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes,Route, Router } from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';
import Login from './components/Login';
import ChatState from './Context/ChatState';
import MessageState from './Context/MessageState';
import Pusher from 'pusher-js'
import Footer from './components/Footer';

function App() {
  

  return (
    <div >
    <ChatState>
    <MessageState>
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      </Routes>
       
      </MessageState>
      </ChatState>
    </div>
  );

}

export default App;
