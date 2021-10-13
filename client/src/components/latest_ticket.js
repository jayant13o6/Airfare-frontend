import React, { useEffect, useState } from "react";
import UserBar from "./userBar";
import { useHistory } from "react-router-dom";

const Booking=()=>{

    const history = useHistory();
    const [userData, setUserData] = useState([]);
    var today = new Date();
    console.log(today.toISOString());
    const callpersonalPage = async() =>{
        try{ 
            const res = await fetch('/history', {
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
            history.push('/indvUser')
            console.log(err)
        }
    }
        useEffect(() =>{
            callpersonalPage();
        },[]);


        // if (userData.date <= today.toISOString()){return( <h3>No tickets booked</h3>)}

        
        return(
        <div>
            <UserBar/>
            <p className='mt-5'>Welcome</p>
            <h5>Booked tickets:</h5>
            {/* <p>{userData}</p> */}
            
            <ul className = 'demo'>
                {userData.map((data,index) =>(
        
                <div className = 'container card' style={{width: 600}}>    
                    <li key={index}>
                    { (today.toISOString() <= (data.departure_date)) && (
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
                                        {data.departure_date} 
                                    </div>
                                    <div className = 'source-dest col-6'>
                                        <div className='time'> Total Tickets: {data.total_pass} </div> 
                                        <div className='ticketCost'> Cost: {data.total_cost} </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    </li>
                    
                    </div>
                           
                    ))
                     }
            
            </ul>

        
            <footer class="page-footer font-small blue">
            <hr/>
            <div class="footer-copyright text-center py-3">No more tickets available</div>
            </footer>

        </div>
    )}


export default Booking