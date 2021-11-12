import React, { useEffect, useState } from "react";
import AdminBar from "./adminBar";
import { useHistory } from "react-router-dom";
import '../index.css';

const Flights_data2=()=>{

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
            <AdminBar/>
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
                                        {dateDisplay(data.flight_date)}
                                        {/* date = new Date('2013-03-10T02:00:00Z'); */}
                                    </div>
                                    <div className = 'source-dest col-6'>
                                        <div className='time'> Time: {data.departure_time} </div> 
                                        <div className='ticketCost'> Cost: <i className="fa fa-rupee"></i> {data.ticketCost} </div> 
                                    </div>
                                    <div>
                                        <button>
                                            <a className = 'delete' data-doc={data._id} onClick = {scheduleDelete}><i className='fa fa-trash'></i></a>
                                        </button>
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


function dateDisplay(x){
    //     var date = new Date('2016-08-25T00:00:00')
    // var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    // return(new Date(date.getTime() - userTimezoneOffset))
        var date_needed = x.split("T")
        return date_needed[0]
    }

    

function scheduleDelete(){
const trash = document.querySelector('a.delete');

trash.addEventListener('click', async (e) =>{
    const endpoint = `/schedule_flight/${trash.dataset.doc}`;
    
    await fetch(endpoint, {
        method: 'DELETE'  })
    .then((response)=> response.json())
    .then((data) => {
        console.log(data)
        // history.push('/search_flights2')
    })
    // .then((data) => window.location.href = data.redirect)
    .catch(err =>{console.log(err)});
})
}

export default Flights_data2