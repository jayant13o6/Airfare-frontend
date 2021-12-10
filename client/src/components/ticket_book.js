import UserBar from "./userBar";
import '../index.css';
import React, { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import {CountContext} from '../App.js';

const Tickets = ({ticketData, setTicketData}) =>{

    const countContext = useContext(CountContext)
    // console.log('data inherit:',paySuccess,setPaySuccess);
    console.log('countcontext:' , countContext.countState,"00", countContext.countDispatch);
    var today = new Date();
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

    // const ticketDataTransfer = async(user) =>{
    //     // e.preventDefault();
    //     this.setTicketData({ticketData: user})
    // }
    const PostData = async(e)=>{
        console.log('Post data called')
        e.preventDefault();
        const{source, destination, departure_date, arrival_date, total_pass, email_id} = user;
        setTicketData(user)
        console.log('data is:',user,'@@@',ticketData); // to see data input
        
        if(departure_date<today.toISOString()){window.alert("Date is invalid")}
        else{
            
            ////////// ----  Before  booking payment first ------//////
        history.push('/payment') 

        if (countContext.countState===true){

        const res = await fetch('/book_ticket',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            // body: JSON.stringify({source, destination, departure_date, arrival_date, total_pass,email_id})
            body: JSON.stringify({user})
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
    }}
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
                            <input className="input-type" type='email' id='email_id' name='email_id' 
                            value= {user.email_id}
                            onChange={handleInput}
                            placeholder=' ' required ></input>
                            <label className='form-label' htmlFor='email_id'>Your EmailId</label>
                        </div>

                        <div className='form-group'>
                            <input className="input-type" type='text' id='source' name='source' 
                            value= {user.source}
                            onChange={handleInput}
                            placeholder=' ' required ></input>
                            <label className='form-label' htmlFor='source'>City you currently At</label>
                        </div>

                        <div className='form-group'>
                            <input className="input-type" type='text' id='destination' name='destination' 
                            value= {user.destination}
                            onChange={handleInput}
                            placeholder=' ' required ></input>
                            <label className='form-label' htmlFor='destination'>Your destination</label>
                        </div>
                        {/* <h2>name is :{user.destination}</h2> */}
                        
                        <div className='form-group'>
                            <input className="input-type" type='date' id='departure_date' name='departure_date' 
                            value= {user.departure_date}
                            onChange={handleInput}
                            placeholder=' ' required />
                            <label className='form-label' htmlFor='depature_date'>Departure Date</label>
                        </div>
                        
                        {/* <div className='form-group'>
                            <label htmlFor='arrival_date'></label>
                            <input className="input-type" type='date' id='arrival_date' name='arrival_date' 
                            value= {user.arrival_date}
                            onChange={handleInput}
                            placeholder='arrival date' required />
                        </div> */}

                        <div className='form-group'>
                            <input className="input-type" type='number' id='total_pass' name='total_pass'
                               value= {user.total_pass}
                               onChange={handleInput}
                               placeholder=' ' required ></input>
                               <label className='form-label' htmlFor='total_pass'>Total no. of tickets</label>
                        </div>
                        {/* <h2>name is :{user.password}</h2> */}
                    
                    <div className='form-group form-button'>
                        <input type='button' name='booking' id='booking' 
                        className='form-submit' value='booking' onClick={PostData}></input>
                    </div>
                    </form>
                    
                    </div>
                </div>
            </section>
        </div>
        
    )
}
export default Tickets;