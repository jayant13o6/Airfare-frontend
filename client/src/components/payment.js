import React, {useState, useContext} from "react";
import UserBar from "./userBar";
import { useHistory } from "react-router-dom";
import {CountContext} from '../App.js';
import { showAlert } from "./alert";

const PaymentGateway = ({ticketData,paySuccess,setPaySuccess})=>{

    const countContext = useContext(CountContext)
    console.log('data inherit:',paySuccess,setPaySuccess);
    console.log('countcontext:' , countContext.countState,"00", countContext.countDispatch)
    console.log('ticket data is :',ticketData);
    const history = useHistory()
    const [user, setUser] = useState({otp:'',otpCheck:''});
    const [userflag, setUserFlag] = useState(1);
    // userflag.flag=1;    
    let name,value;
    const handleInput = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }
    const sendOTP = (e)=>{
        // setUserFlag(userflag => {
        //     return { ...userflag, flag:0 }
        //   });
        // userflag.flag=0;
        setUserFlag(false)
        e.preventDefault();
        const num = Math.floor((Math.random() * 10000) + 1);   // random num genrate
        const {number} = user;
        setUser({...user,otpCheck:num});
        const res = fetch('/otpSend', { 
            method:'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({num})

        }).then((res)=>{console.log(res.status)
            return res.json()})
        .then((data)=>{
            // const data = result.json(); //to check data
            // console.log('res:',res.json)
            console.log('request is:',data)
            if (!data){
                showAlert('Invalid entries. Please check schedule again','warning');
                console.log('invslid entry',res.status)
            } else{
                showAlert('OTP sent successfully.','success');
                console.log('vslid register',res.status());
                console.log('otp value check:',user.otpCheck,user.otp);
                // history.push('/payment')
            }    
        })
        .catch((err)=>{console.log(err)})
    }
    
    const PaymentConfirm = async(e) =>{
        e.preventDefault();
        
        if (user.otp == user.otpCheck){
            showAlert('OTP Matched','success');
            // setPaySuccess(true)
            const res = await fetch('/book_ticket',{
                method: 'POST',
                headers:{"Content-Type": "application/json"},
                mode: 'cors',
                body: JSON.stringify(countContext.countState)
            })
            .then(async(res)=>{
            const data = await res.json(); //to check data
            console.log('res:',res.json,'request is:',data)
            if (res.status !== 200){
                showAlert('Invalid entries. Please check schedule again','danger');
                console.log('invslid entry')
            } else{
                showAlert('valid entry','success');
                console.log('vslid register');
                history.push('/indvUser')
                }
            })
            .catch((err)=>console.log(err))
        }
            // countContext.countDispatch('1')
            // history.push('/ticket_book')
        
        else{window.alert('wrong otp')}
        
    }

    return(

        <div>            
            <UserBar/>
        
            <h3 className='my-4'>PaymentGateway:</h3><h6 className='mb-3'>Enter details</h6>
                                
                    <form className='Payment-gate'  method='POST'>
                        <div className='form-group'>
                            <label htmlFor='Phone No'></label>
                            <input type='number' id='number' name='number' 
                            value= {user.number}
                            onSubmit={handleInput}
                            placeholder='enter registered phone no.' required ></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='OTP'></label>
                            <input type='number' id='otp' name='otp' 
                            value= {user.otp}
                            onChange={handleInput}
                            placeholder='Enter the OTP'></input>
                        </div>

                        <div className='form-group form-button' 
                        style={{display: userflag ? 'block' : 'none' }}>
                        <input type='button' name='otpGenerate' id='otpGenerate' 
                        className='form-submit' value='Send OTP'
                        onClick={sendOTP}></input>
                        </div>

                        <div className='form-group form-button' 
                        style={{display: userflag ? 'none' : 'block' }}>
                        <input type='button' name='matchOTP' id='matchOTP' 
                        className='form-submit' value='Pay for tickets' 
                        onClick={PaymentConfirm}></input>
                        </div>
                    </form>
            
        </div>

        // <div></div>
    )
}
<script>
    
</script>
export default PaymentGateway;