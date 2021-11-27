import React, { useEffect, useState } from "react";
import UserBar from "./userBar";
import { useHistory } from "react-router-dom";
import '../index.css';
import { showAlert } from "./alert";
import { compareDestinations } from "./regex";
import { google } from "../../../../Airfare backend/server/node_modules/google-auth-library/build/src";
<script async
    tpye="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTbpmkmQdvQl7lEWgTMmQmqBTWSd4zMkU&libraries=places&callback=activatePlacesSearch">
</script>

const Flights_data=()=>
{

    const history = useHistory();
    const [userData, setUserData] = useState([]);

    ////-----for filter----////
    const [user, setUser] = useState({ search:'' });
    let name,value;

    const SearchText = (e) =>{
        e.preventDefault()
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const SearchDestination = async(e) =>{
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
        .then(async (res)=>{
            const data_for_filter = await res.json(); //to check data
            setUser(data_for_filter);
            console.log('res:',res.json)
            console.log('city value for filter:',data_for_filter)
            if (res.status === 400 || !data_for_filter){
                showAlert('Invalid Data','warning')
                console.log('invslid data')
            } 
            else{
                window.alert('valid register');
                console.log('vslid data');
                // history.push('/search_flights')
            }
        })
        .catch((err)=>console.log(err))
    }
    
    function activatePlacesSearch(){
        var input = document.getElementById('searchDestination');
        var autocomplete = new google.maps.places.Autocomplete(input);
    }

    const callpersonalPage = async() =>{
        try{ 
            // if (!res.json()){
            const res = await fetch('/schedule_flight', {
                method: "GET",
                headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials:'include'
            })
                const data = await res.json()
                console.log('data in personal:',data)
                setUserData(data);
                if (!res.status === 200){ 
                    const error = new Error(res.error);
                    throw error; }            
        
    }
        catch(err){
            history.push('/admin')
            console.log(err)
        }
        }
        useEffect(() =>{
            callpersonalPage();
        },[]);
    
    if(user.search){
    return(
        <div>
            <UserBar/>
            <p className='mt-5'>Welcome</p>
            <h1>Upcoming Schedule</h1>
            {/* <p>{userData}</p> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{width: 750, alignContent:'center'}}>
                <a className="navbar-brand">Flight Schedule</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter
                        </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item">Destination</a>
                        <a className="dropdown-item">Date</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item">Something else here</a>
                    </div>
                    </li>
                    
                </ul>
                <form className="d-flex" method='POST'>
                    <input className="form-control" type="search" 
                    name="search" value= {user.search} id='searchDestinantion'
                    onInput={SearchText}
                    placeholder="Search your destination" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="button" onClick = {SearchDestination}>Search</button>
                </form>

            </div>
            </nav>
{/* *********---------------------navbar ended-----------------*********** */}
            <h5><ul className = 'demo'>
                {userData.map((data,index) =>(
                <div className = 'container card' style={{width: 750}}>    
                    <li key={index}>
                    {/* {(user.search == (data.destination.slice(0,3))) && ( */}
                        {(compareDestinations(data.destination,user.search)) && (
                        <div>
                            <div className = 'card-header'>
                                <div className = 'row'>
                                    <div className ='flight_code col-6'>
                                        <i className="zmdi zmdi-airplane zmdi-hc-2x"></i> 
                                        {data.flight_code} 
                                    </div>
                                    <div className = 'source-dest col-6'>
                                        {data.source} 
                                        <i className="zmdi zmdi-arrow-right zmdi-hc-2x"></i>
                                        {data.destination} 
                                    </div>
                                </div>
                            </div>
                            <div className = 'card-body'>
                                {/* <div className = 'date'> {data.flight_date} </div> */}
                                <div className = 'row'>
                                    <div className ='flight_date col-6'>
                                        <i className="zmdi zmdi-calendar zmdi-hc-2x"></i> 
                                        {/* {data.flight_date.getFullYear()+'-' + (data.flight_date.getMonth()+1) + '-'+data.flight_date.getDate()} */}
                                        {/* {data.flight_date} */}
                                        {dateDisplay(data.flight_date)}
                                        
                                    </div>
                                    <div className = 'source-dest col-6'>
                                        <div className='time'> Time: {data.departure_time} </div> 
                                        <div className='ticketCost'> Cost: 
                                            {/* <i class="fas fa-rupee-sign"></i> */}
                                            <i class="fa fa-rupee"></i> 
                                                {data.ticketCost} 
                                        </div> 
                                    </div>
                                </div>
                                <button>
                                    <a className = 'bookButton' //data-doc={data._id} 
                                    ><i className='fa fa-trash'></i></a>
                                </button>
                            </div>
                        </div>
                     )} 
                    </li>
                    </div>
                    ))}
            </ul></h5>
        

            <footer class="page-footer font-small blue">
            <hr/>
            <div class="footer-copyright text-center py-3">No more flights available</div>
            </footer>

        </div>
    )}

    return(
        <div>
            <UserBar/>
            <p className='mt-5'>Welcome</p>
            <h1>Upcoming Schedule</h1>
            {/* <p>{userData}</p> */}
            <nav className="navbar container navbar-expand-md navbar-light bg-light" style={{width: 750}}>
                <a className="navbar-brand">Flight Schedule</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter
                        </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item">Destination</a>
                        <a className="dropdown-item">Date</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item">Something else here</a>
                    </div>
                    </li>
                    
                </ul>
                <form className="d-flex" method='POST'>
                    <input className="form-control" type="search" 
                    name="search" id='searchDestinantion' value= {user.search}
                    onInput={SearchText}
                    placeholder="Search your destination" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit" onClick = {SearchDestination}>Search</button>
                </form>

            </div>
            </nav>
{/* *********---------------------navbar ended-----------------*********** */}
            <h5><ul className = 'demo'>
                {userData.map((data,index) =>(
                <div className = 'container card' style={{width: 750}}>    
                    <li key={index}>
                    {/* {(user.search === (data.destination)) && ( */}
                        <div>
                            <div className = 'card-header'>
                                <div className = 'row'>
                                    <div className ='flight_code col-6'>
                                        <i className="zmdi zmdi-airplane zmdi-hc-2x"></i> 
                                        {data.flight_code} 
                                    </div>
                                    <div className = 'source-dest col-6'>
                                        {data.source} 
                                        <i className="zmdi zmdi-arrow-right zmdi-hc-2x"></i>
                                        {data.destination} 
                                    </div>
                                </div>
                            </div>
                            <div className = 'card-body'>
                                {/* <div className = 'date'> {data.flight_date} </div> */}
                                <div className = 'row'>
                                    <div className ='flight_date col-6'>
                                        <i className="zmdi zmdi-calendar zmdi-hc-2x"></i> 
                                        {/* {data.flight_date.getFullYear()+'-' + (data.flight_date.getMonth()+1) + '-'+data.flight_date.getDate()} */}
                                        {/* {data.flight_date} */}
                                        {dateDisplay(data.flight_date)}
                                        
                                    </div>
                                    <div className = 'source-dest col-6'>
                                        <div className='time'> Time: {data.departure_time} </div> 
                                        <div className='ticketCost'> Cost: 
                                            {/* <i class="fas fa-rupee-sign"></i> */}
                                            <i class="fa fa-rupee"></i> 
                                                {data.ticketCost} 
                                        </div> 
                                    </div>
                                </div>
                                        {/* ticket button */}
                                <button className="btn btn-outline-primary">
                                    <a className = 'bookButton ' onClick={bookTicketButton} 
                                    type = 'button' data-doc={data._id} >Book Tickets</a>
                                </button>
                            </div>
                        </div>
                     {/* )}  */}
                    </li>
                    </div>
                    ))}
            </ul></h5>
        

            <footer class="page-footer font-small blue">
            <hr/>
            <div class="footer-copyright text-center py-3">No more flights available</div>
            </footer>

        </div>
    )
}//component ended

function dateDisplay(x){
//     var date = new Date('2016-08-25T00:00:00')
// var userTimezoneOffset = date.getTimezoneOffset() * 60000;
// return(new Date(date.getTime() - userTimezoneOffset))
    var date_needed = x.split("T")
    return date_needed[0]
}

function bookTicketButton(){
    const trash = document.querySelector('a.bookButton');

    trash.addEventListener('click', async (e) =>{
        const endpoint = `/schedule_flight/${trash.dataset.doc}`;
    })
}

{/* <script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTbpmkmQdvQl7lEWgTMmQmqBTWSd4zMkU&libraries=places&callback=activatePlacesSearch">
</script> */}
export default Flights_data