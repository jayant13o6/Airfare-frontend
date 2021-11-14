import React, {useState} from "react";
import UserBar from "./userBar";


const PaymentGateway = ()=>{

    const [user, setUser] = useState({otp:''});
    
    let name,value;
    const handleInput = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }
    const sendOTP = ()=>{
        const num = Math.floor((Math.random() * 10000) + 1); 
        // const {number} = user
        const res = fetch('/otpSend', { 
            method:'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({num})
        }).then((res)=>{
            console.log(res);
            window.alert('otp send!!');
        })
        .catch((err)=>{console.log(err)})
    }

    return(

        <div>
            <UserBar/>
            <h3>PaymentGateway:<h6>Enter details</h6></h3>
                <section>
                    <form className='Payment-gate' method='POST'>
                        <div className='form-group'>
                            <label htmlFor='Phone No'></label>
                            <input type='number' id='number' name='number' 
                            // value= {user.number}
                            // onChange={handleInput}
                            placeholder='enter registered phone no.' required ></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='OTP'></label>
                            <input type='number' id='otp' name='otp' 
                            value= {user.otp}
                            onChange={handleInput}
                            placeholder='OTP'></input>
                        </div>

                        <div className='form-group form-button'>
                        <input type='submit' name='booking' id='booking' 
                        className='form-submit' value='Send OTP' onClick={sendOTP}></input>
                        </div>
                    </form>
                </section>
        </div>

        // <div></div>
    )
}

export default PaymentGateway;