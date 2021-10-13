import UserBar from "./userBar";
import '../index.css';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Tickets = () =>{
    const history = useHistory();
    const [user, setUser] = useState({
        source:'', destination:'', departure_date:'', arrival_date:'', total_pass:'', email_id:''
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
        const{source, destination, departure_date, arrival_date, total_pass, email_id} = user;
        console.log('data is:',user); // to see data input
        
        const res = await fetch('/book_ticket',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({source, destination, departure_date, arrival_date, total_pass,email_id})
            // body: JSON.stringify({user})
        })
        .then(async (res)=>{
         const data = await res.json(); //to check data
        console.log('res:',res.json)
        console.log('request is:',data)
        if (res.status !== 200){
            window.alert('Invalid entries. Please check schedule again');
            console.log('invslid entry')
        } else{
            window.alert('valid entry');
            console.log('vslid register');
            history.push('/indvUser')
            }
        })
        .catch((err)=>console.log(err))
    }
    return(
        <div>
            <UserBar/>
            <p className='mt-5'>Welcome</p>
            {/* <h1>Mern Development</h1> */}
            <section className='login'>
                <div className='container mt-5'>
                    <div className='login-form'>
                    <h2>Book your Tickets:</h2>
                    <form className='Login-form' id='ticket-form' method='POST'>
                        
                        <div className='form-group'>
                            <label htmlFor='email_id'></label>
                            <input type='email' id='email_id' name='email_id' 
                            value= {user.email_id}
                            onChange={handleInput}
                            placeholder='enter registered email id' required ></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='source'></label>
                            <input type='text' id='source' name='source' 
                            value= {user.source}
                            onChange={handleInput}
                            placeholder='City you currently At' required ></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='destination'></label>
                            <input type='text' id='destination' name='destination' 
                            value= {user.destination}
                            onChange={handleInput}
                            placeholder='Your destination' required ></input>
                        </div>
                        {/* <h2>name is :{user.destination}</h2> */}
                        
                        <div className='form-group'>
                            <label htmlFor='depature_date'>Departure date: </label>
                            <input type='date' id='departure_date' name='departure_date' 
                            value= {user.departure_date}
                            onChange={handleInput}
                            placeholder='departure date' required />
                        </div>
                        
                        {/* <div className='form-group'>
                            <label htmlFor='arrival_date'></label>
                            <input type='date' id='arrival_date' name='arrival_date' 
                            value= {user.arrival_date}
                            onChange={handleInput}
                            placeholder='arrival date' required />
                        </div> */}

                        <div className='form-group'>
                            <label htmlFor='total_pass'></label>
                            <input type='number' id='total_pass' name='total_pass'
                               value= {user.total_pass}
                               onChange={handleInput}
                               placeholder='Total no. of tickets' required ></input>
                        </div>
                        {/* <h2>name is :{user.password}</h2> */}
                    
                    <div className='form-group form-button'>
                        <input type='submit' name='booking' id='booking' className='form-submit' value='booking' onClick={PostData}></input>
                    </div>
                    </form>
                    
                    </div>
                </div>
            </section>
        </div>
        
    )
}
export default Tickets;