import Navbar from './navbar';
import air1 from '../image11/air1.jpg';
import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import '../index.css';
// import axios from 'axios';
import { showAlert } from './alert';
import GoogleLogin from 'react-google-login';
<script src="https://accounts.google.com/gsi/client" async defer></script>

const Signup = () =>{
    const history =useHistory();
    //destructure of object
    //syntax const[variable, method_toChangeValue_ofVar] = usestate(initialValue)
    const [user, setUser] = useState({
        name:'', email:'', password:'', c_password:'', p_no:''
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
        const{name, email, password, c_password, p_no} = user;
        console.log('data is:',user); // to see data input
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if (!name || !email || !password || !c_password || !p_no){window.alert('enter details completely')}
        if (!email.match(mailformat)){window.alert('not valid email')}
        else{
        // axios.post('/register',user)
        //     .then((res)=>{
        //         console.log(res)
        //         const data = res.json()
        //         if (data.status === 400 || !data){
        //             window.alert('invalid register');
        //             console.log('invslid register')
        //         } 
        //         else{
        //             window.alert('valid register');
        //             console.log('vslid register');
        //             history.push('/login');            
        //         }
        //     })
        //     .catch((err)=>{console.log(err)})
        const res = await fetch('/register',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({name, email, password, c_password, p_no})
            // body: JSON.stringify({user})
        })
        .then((res)=>{
            console.log(res)
            const data = res.json()
            if(res.status === 400 || !data){
                showAlert('invalid credentials','warning');
                console.log('invslid register')
            } 
            else{
                
                if (password !== c_password){window.alert('password not matches')}
                else{
                showAlert('valid register','success');
                console.log('vslid register');
                history.push('/login');            
            }}
        })
        .catch((err)=>{console.log(err)})

        // const data = res.json(); //to check data
        // console.log(data);
        // console.log('history:');
        
    }}
    const SuccessGoogle = async (response)=>{
        console.log(response)
        const res = await fetch('/googleregister', {
            method:'POST', 
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify(response)
            // body: JSON.stringify({user})
        })
            .then(async (res)=>{
                console.log(res)
                const data = await res.json()
                try{
                    if (res.status === 400 || !data){
                    showAlert('invalid register','danger');
                    console.log('invslid register')
                } else{
                    console.log('data:',data)
                    // window.alert('valid register');
                    console.log('vslid register');
                    history.push('/login');            
                }
            }catch(err){console.log(err)}
            })
            .catch((err)=>{console.log(err)})
    }
    const FailureGoogle = (response)=>{console.log(response)}
    return(
        <div>
        <Navbar/>
        <div className="row p-4">
                <div className='signupform col-4' style={{justifyContent:'left'}}>
                {/* <div className='m-5'> */}
                <h2>Register to start journey:</h2>
                    <form className='signupform1' id='register-form' method='POST'>
                        <div className='form-group'>
                            <label htmlFor='name'><i className="zmdi zmdi-account zmdi-hc-2x"></i></label>
                            <input type='text' id='name' name='name' 
                            value= {user.name}
                            onChange={handleInput}
                            placeholder='Your name' required ></input>
                        </div>
                        {/* <h2>name is :{user.name}</h2> */}
                        <div className='form-group'>
                            <label htmlFor='email'><i className="zmdi zmdi-email zmdi-hc-2x"></i></label>
                            <input type='email' id='email' name='email'
                               value= {user.email}
                               onChange={handleInput}
                               placeholder='Your email address' required ></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'><i className="zmdi zmdi-lock zmdi-hc-2x"></i></label>
                            <input type='password' id='password' name='password'
                               value= {user.password}
                               onChange={handleInput}
                               placeholder='Your password' required ></input>
                        </div>
                        {/* <h2>name is :{user.password}</h2> */}
                        <div className='form-group'>
                            <label htmlFor='c_password'><i className="zmdi zmdi-lock zmdi-hc-2x"></i></label>
                            <input type='password' id='c_password' name='c_password'
                               value= {user.c_password}
                               onChange={handleInput}
                               placeholder='Confirm your password' required ></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='p_no'><i className="zmdi zmdi-phone-in-talk zmdi-hc-2x"></i></label>
                            <input type='number' id='p_no' name='p_no'
                               value= {user.p_no}
                               onChange={handleInput}
                               placeholder='Contact Number' required ></input>
                        </div>
                    
                    <div className='form-group form-button'>
                        <input type='submit' name='signup' 
                        id='signup' className='form-submit' 
                        value='register' onClick={PostData}/>
                    </div>
                    
                    <div><GoogleLogin
                        clientId="630453011763-n2ecob2smr1j279kki66vf3ujdvovt55.apps.googleusercontent.com"
                        buttonText="Signup"
                        onSuccess={SuccessGoogle}
                        onFailure={FailureGoogle}
                        cookiePolicy={'single_host_origin'}/>
                    </div>
                    
                    <div className='link1 py-2'>
                        <NavLink to='/login'>I already have an account!!</NavLink>
                    </div>
                    </form>

                </div>
                <div className='signupform2 col-8' > 
                {/* <p><h1>something!</h1></p> */}
                    {/* <img className='imageBu' src={air1} alt='image for back' /> */}
                </div>
            </div>
    </div>    
    )
}

export default Signup;
// style={{ resizeMode:'cover',width:'50%',height:'200%'}}