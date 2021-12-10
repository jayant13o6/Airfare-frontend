import io from 'socket.io-client';
import React from 'react'
import Navbar from './navbar';
const Home = () =>{
    
    const socketEvent = (e)=>{
    e.preventDefault()
    var socket = io();
    socket.emit('ping', 'Hello!');
    socket.on('recieve', message =>{
        // document.getElementById("status").innerHTML = "connected";   
        // socket.emit('message', 'Hello!');
        console.log('from server:',message)
      });
    }
    return(
        <div>
            <Navbar/>
            <p className='mt-5'>Welcome</p>
            <h1>Mern Development</h1>
            <button className='btn btn-info' id='ping' onClick={socketEvent}>Ping!!</button>
            <script src="/socket.io/socket.io.js"></script>
    
     
        </div>
    )
}
export default Home;