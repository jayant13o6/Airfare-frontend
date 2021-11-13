import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useHistory } from 'react-router';

const UserBar = () =>{
    const history = useHistory()

    const [user, setUser] = useState({ search:'' });
    let name,value;
    const SearchText = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }
    
    const searchFlight = async(e) =>{

        e.preventDefault();
        const{search} = user;
        console.log('data is:',user); // to see data input
        
        const res = await fetch('/searchDestination',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({search})
            // body: JSON.stringify({user})
        })
        .then((res)=>{
            const data = res.json(); //to check data
            console.log('res:',res.json)
            console.log(data)
            if (res.status === 400 || !data){
                window.alert('invalid data');
                console.log('invslid data')
            } 
            else{
                window.alert('valid register');
                console.log('vslid data');
                history.push('/search_flights')
            }

        })
        .catch((err)=>console.log(err))
    }
    return(
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
        <a className="navbar-brand" href='/' style={{color:'black'}}>AirFare</a>
        
        {/* collapse-button */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0"> */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link active" href="/home" style={{color:'black'}}>Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/search_flights" style={{color:'black'}}>Search Flights</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/ticket_book" style={{color:'black'}}>book tickets</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/history" style={{color:'black'}}>History</a>    
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/Bookings" style={{color:'black'}}>Latest Booking</a>    
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/logout" style={{color:'black'}}>Logout</a>    
                </li>
              </ul>
                <form className="d-flex" method='POST'>
                    <input className="form-control" type="search" 
                    name="search" value= {user.search}
                    onChange={SearchText}
                    placeholder="Search your destination" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit" onClick = {searchFlight}>Search</button>
                </form>
</div>
</div>
</nav>
    )
}
export default UserBar