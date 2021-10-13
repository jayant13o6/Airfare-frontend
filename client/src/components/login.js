import Navbar from './navbar';
import '../index.css';
import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
<script src="https://accounts.google.com/gsi/client" async defer></script>

const Login = () =>{
    const history = useHistory();
    //destructure of object
    //syntax const[variable, method_toChangeValue_ofVar] = usestate(initialValue)
    const [user, setUser] = useState({
        email:'', password:''
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
        const{email, password} = user;
        console.log('data is:',user); // to see data input
        
        // axios.post('/login',user)
        //     .then((res)=>{
        //         console.log(res)
        //         const data = res.json(); //to check data
        
        // // console.log('res:',res.json)
        // console.log(data)
        // if (data.status === 400 || !data){
        //     window.alert('invalid register');
        //     console.log('invslid register')
        // } else{
        //     window.alert('valid register');
        //     console.log('vslid register');
            
        // }
        //     })
        //     .catch((err)=>{console.log(err)})
        const res = await fetch('/login',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({email, password})
            // body: JSON.stringify({user})
        })
        .then((res)=>{
        const data = res.json(); //to check data
        console.log('res:',res.json)
        console.log(data)
        if (res.status === 400 || !data){
            window.alert('invalid credentials');
            console.log('invslid credentials')
        } else{
            window.alert('valid register');
            console.log('vslid register');
            history.push('/indvUser')
            }

        })
        .catch((err)=>console.log(err))
    }
    const SuccessGoogle = async (response)=>{
        console.log(response)
        // axios.post('/googleregister',response)
        // axios({
        //     method: 'POST',
        //     url: 'http://localhost:8000/googleregister',
        //     data: {tokenId: response.tokenId},
        //     // mode: 'cors',
        // })
        const res = await fetch('/googleregister',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({tokenId: response.tokenId})
            // body: JSON.stringify({user})
        })
            .then((res)=>{
                console.log(res)
                const data = res.json()
                if (data.status === 404 || !data){
                    window.alert('invalid register');
                    console.log('invslid register')
                } else{

                    window.alert('valid register');
                    console.log('vslid register');
                    history.push('/indvUser');            
                }
            })
            .catch((err)=>console.log(err))
    }
    const FailureGoogle = (response)=>{console.log(response)}
    return(
        <div>
            <Navbar/>
            <p>Ready to signup</p>
            <h1>AirFare</h1>
            <section className='login'>
                <div className='container mt-5'>
                    <div className='login-form'>
                    <h2>Login to start journey:</h2>
                    <form className='Login-form' id='login-form' method='POST'>
                        <div className='form-group'>
                            <label htmlFor='email'><i className="zmdi zmdi-email zmdi-hc-2x"></i></label>
                            <input type='email' id='email' name='email' 
                            value= {user.email}
                            onChange={handleInput}
                            placeholder='Your email address' required ></input>
                        </div>
                        {/* <h2>name is :{user.email}</h2> */}
                        
                        <div className='form-group'>
                            <label htmlFor='password'><i className="zmdi zmdi-lock zmdi-hc-2x"></i></label>
                            <input type='password' id='password' name='password'
                               value= {user.password}
                               onChange={handleInput}
                               placeholder='Your password' required ></input>
                        </div>
                        {/* <h2>name is :{user.password}</h2> */}
                    
                    <div className='form-group form-button'>
                        <input type='submit' name='login' id='login' className='form-submit' value='login' onClick={PostData}></input>
                    </div>

                    <GoogleLogin
                        clientId="630453011763-n2ecob2smr1j279kki66vf3ujdvovt55.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={SuccessGoogle}
                        onFailure={FailureGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    </form>
                    
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;