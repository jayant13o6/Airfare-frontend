import '../index.css';
import { useState } from "react";
import React from 'react'
import AdminBar from './adminBar';
import { useHistory } from 'react-router-dom';

const Flights = () =>{
    const history = useHistory()
    const [user, setUser] = useState({
        flight_code:'', source:'', destination:'', flight_date:'', departure_time:'', arrival_time:'', ticketCost:''
    });
    let name,value;
    const handleInput = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const PostData = async(e)=>{
        e.preventDefault();
        const{flight_code, source, destination, flight_date, departure_time, arrival_time, ticketCost} = user;
        console.log('data is:',user); // to see data input
        
        const res = await fetch('/schedule_flight',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({flight_code, source, destination,flight_date, departure_time, arrival_time, ticketCost})
            // body: JSON.stringify({user})
          })
            .then(async (res)=>{
            const data = await res.json(); //to check data
        
            console.log(data)
            if (data.status === 400 || !data){
                window.alert('invalid register');
                console.log('invslid register')
            } else{
                window.alert('valid register');
                console.log('vslid register');
                history.push('./adminUser')
            }
            })
            .catch((err)=>{console.log(err)})
}
    return(
        <div>
            <><AdminBar/></>
            <p className='mt-5'>Welcome</p>
            {/* <h1>Mern Development</h1> */}
            <section className='login'>
                <div className='container mt-5'>
                    <div className='login-form'>
                    <h2>Enter a schedule:</h2>
                    <form className='Login-form' id='schedule-form' method='POST'>
                        
                        <div className='form-group'>
                            <label htmlFor='flight_code'></label>
                            <input type='text' id='flight_code' name='flight_code' 
                            value= {user.flight_code}
                            onChange={handleInput}
                            placeholder='Enter flight code' required ></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='source'></label>
                            <input type='text' id='source' name='source' 
                            value= {user.source}
                            onChange={handleInput}
                            placeholder='Enter the starting point' required ></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='destination'></label>
                            <input type='text' id='destination' name='destination' 
                            value= {user.destination}
                            onChange={handleInput}
                            placeholder='Enter the ending point' required ></input>
                        </div>
                        {/* <h2>name is :{user.destination}</h2> */}
                        
                        <div className='form-group'>
                            <label htmlFor='flight_date'>Flight Date</label>
                            <input type='date' id='flight_date' name='flight_date' 
                            value= {user.flight_date}
                            onChange={handleInput}
                            placeholder='Enter the date' required ></input>
                        </div>
                        
                        <div className='form-group'>
                            <label htmlFor='depature_time'> Departure Time</label>
                            <input type='time' id='departure_time' name='departure_time' 
                            value= {user.departure_time}
                            onChange={handleInput}
                            placeholder='departure time' required />
                        </div>
                        
                        <div className='form-group'>
                            <label htmlFor='arrival_time'> Landing Time</label>
                            <input type='time' id='arrival_time' name='arrival_time' 
                            value= {user.arrival_time}
                            onChange={handleInput}
                            placeholder='arrival time' required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='ticketCost'></label>
                            <input type='number' id='ticketCost' name='ticketCost'
                               value= {user.ticketCost}
                               onChange={handleInput}
                               placeholder='Cost of each ticket' required ></input>
                        </div>
                        {/* <h2>name is :{user.password}</h2> */}
                    
                    <div className='form-group form-button'>
                        <input type='submit' name='booking' id='booking' className='form-submit' value='Add Flight' onClick={PostData}></input>
                    </div>
                    </form>
                    
                    </div>
                </div>
            </section>
        </div>
        
    )
}
export default Flights;