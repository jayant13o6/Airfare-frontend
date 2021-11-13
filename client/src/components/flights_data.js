import React, { useEffect, useState } from "react";
import UserBar from "./userBar";
import { useHistory } from "react-router-dom";
import '../index.css';

const Flights_data=()=>
{

    const history = useHistory();
    const [userData, setUserData] = useState([]);

    ////-----for filter----////
    const [user, setUser] = useState({ search:'' });
        let name,value;
        const SearchText = (e) =>{
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
                window.alert('invalid data');
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
    //////////////////
    // let city = data_for_filter.destination
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
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand">Flight Schedule</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter
                        </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item">Destination</a>
                        <a class="dropdown-item">Date</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item">Something else here</a>
                    </div>
                    </li>
                    
                </ul>
                <form className="d-flex" method='POST'>
                    <input className="form-control" type="search" 
                    name="search" value= {user.search}
                    onChange={SearchText}
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
                    {(user.search === (data.destination)) && (
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
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand">Flight Schedule</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter
                        </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item">Destination</a>
                        <a class="dropdown-item">Date</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item">Something else here</a>
                    </div>
                    </li>
                    
                </ul>
                <form className="d-flex" method='POST'>
                    <input className="form-control" type="search" 
                    name="search" value= {user.search}
                    onChange={SearchText}
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
export default Flights_data