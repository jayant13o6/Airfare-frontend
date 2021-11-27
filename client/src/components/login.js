import Navbar from './navbar';
import '../index.css';
import React, {useState} from 'react';
// import axios from 'axios';
import { showAlert } from './alert';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
<script src="https://accounts.google.com/gsi/client" async defer></script>

const Login = () =>{
    const history = useHistory();
    //destructure of object
    //syntax const[variable, method_toChangeValue_ofVar] = usestate(initialValue)
    const [user, setUser] = useState({ email:'', password:'' });
    
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
            
            showAlert('Wrong Credentials','warning')
            console.log('invslid credentials')
        } else{
            showAlert("Valid Credentials", 'Success')
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
                    showAlert('Wrong Credentials','warning')
                    console.log('invslid register')
                } else{
                    // showAlert('Valid Credentials','success')
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
            {/* <p>Ready to signup</p> */}
            
            <h1>AirFare</h1>
            <section className='login'>
                <div className='container mt-5'>
                {/* <div className='alert alert-danger'><strong>Wrong Credentials</strong></div> */}
                    <div className='login-form' onLoad = {getcookiedata()}>
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
                    
                        <div className='form-group'>
                            <label htmlFor='remember-me'></label>
                            <input type='checkbox' id='remember-me' name='remember-me' 
                            onClick={setcookie}></input>Remember me
                        </div>
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


function setcookie(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    document.cookie = 'UserEmail=' + email +  "; path=http://localhost:3000/login";
    document.cookie = 'UserPassword=' + password +  "; path=http://localhost:3000/login";
}

function getcookiedata(){ 
    console.log(document.cookie);
    // console.log(document.cookie[11]);
    console.log('cookis');
    // getCookie();
    // const userEmail = getCookieName()
    // const userPassword = getCookiePwd()
    console.log(document.getElementById('email'))
    // document.getElementById('email').value = getCookieName();
    // document.getElementById('password').value = getCookiePwd();
}

function getCookieName(){
    var cookieValue = document.cookie;
    var cookieArray = cookieValue.split(' ')
    console.log(cookieArray)
    var u1 = cookieArray[1].split('=')
    var name = u1[1].split(';')[0]
    console.log(name)
    return (name)  
}

function getCookiePwd(){
    var cookieValue = document.cookie;
    var cookieArray = cookieValue.split(' ')
    console.log(cookieArray)
    var u2 = cookieArray[2].split('=')
    var pwd = u2[1]
    console.log(pwd)
    return (pwd)  
}

export default Login;