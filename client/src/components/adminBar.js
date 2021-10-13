import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';


const AdminBar = () =>{
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
                    <a className="nav-link" href="/search_flights2" style={{color:'black'}}>Flights Schedule</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/createAdmin" style={{color:'black'}}>Create Admin</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/schedule_flight" style={{color:'black'}}>Add Flight</a>    
                </li>
                {/* <li className="nav-item">
                    <a className="nav-link" href="/Bookings" style={{color:'black'}}></a>    
                </li> */}
                <li className="nav-item">
                    <a className="nav-link" href="/adminlogout" style={{color:'black'}}>Logout</a>    
                </li>
              </ul>
                <form className="d-flex">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
</div>
</div>
</nav>
    )
}
export default AdminBar