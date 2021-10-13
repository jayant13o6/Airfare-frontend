import React, { useEffect, useState } from "react";
import UserBar from "./userBar";
import { useHistory } from "react-router-dom";
import '../index.css';

const Flights_data=()=>{

    const history = useHistory();
    const [userData, setUserData] = useState([]);
    const callpersonalPage = async() =>{
        try{ 
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
    
    return(
        <div>
            <UserBar/>
            <p className='mt-5'>Welcome</p>
            <h1>Upcoming Schedule</h1>
            {/* <p>{userData}</p> */}
            
            <h5><ul className = 'demo'>
                {userData.map((data,index) =>(
                <div className = 'container card' style={{width: 750}}>    
                    <li key={index}>
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
                                        {data.flight_date}
                                        {/* date = new Date('2013-03-10T02:00:00Z'); */}
                                    </div>
                                    <div className = 'source-dest col-6'>
                                        <div className='time'> Time: {data.departure_time} </div> 
                                        <div className='ticketCost'> Cost: {data.ticketCost} </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    </div>
                    ))}
            </ul></h5>
        
        </div>
    )
}

export default Flights_data