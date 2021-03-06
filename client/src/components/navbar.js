import React, {useState} from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';

const Navbar = () =>{

    
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
                    <a className="nav-link active" href="/" style={{color:'black'}}>Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/admin" style={{color:'black'}}>Admin</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/ticket_book" style={{color:'black'}}>book tickets</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signup" style={{color:'black'}}>First time Users</a>    
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login" style={{color:'black'}}>Old User</a>    
                </li>

              </ul>
  {/* <form className="d-flex" method='POST'>
    <input className="form-control" type="search" 
                        id='search' name='search' 
                        value= {user.search}
                        onChange={SearchText}
                        placeholder="Search" aria-label="Search"></input>
    <button className="btn btn-outline-success" type="submit" onClick = {searchFlight} >Search</button>
  </form> */}
</div>
</div>
</nav>
    )
}


export default Navbar