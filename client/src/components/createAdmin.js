import AdminBar from './adminBar';
import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import '../index.css';
import { showAlert } from './alert';

const CreateAdmin = () =>{
    const history = useHistory();
    //destructure of object
    //syntax const[variable, method_toChangeValue_ofVar] = usestate(initialValue)
    const [user, setUser] = useState({
        name:'', email:'', password:'', c_password:'', p_no:'', adminId:''
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
        const{name, email, password, c_password, p_no, adminId} = user;
        console.log('data is:',user); // to see data input
        
        // axios.post('/register',user)
        //     .then((res)=>{
        //         console.log(res)
        //         const data = res.json()
        //         if (data.status === 400 || !data){
        //             window.alert('invalid register');
        //             console.log('invslid register')
        //         } else{
        //             window.alert('valid register');
        //             console.log('vslid register');
        //             history.push('/');            
        //         }
        //     })
        //     .catch((err)=>{console.log(err)})
        const res = await fetch('/new_admin',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({name, email, password, c_password, p_no,adminId })
            // body: JSON.stringify({user})
        })
        .then((res)=>{
            console.log(res)
            const data = res.json()
            if (data.status === 400 || !data){
                showAlert('Wrong Credentials','warning')
                console.log('invslid register')
            } else{
                window.alert('valid register');
                console.log('vslid register');
                history.push('/admin');            
            }
        })
        .catch((err)=>{console.log(err)})
        
        
        
    }
    return(
        <div>
            <AdminBar/>
                <div className='signup-form'>
                <h2>Create new admin:</h2>
                    <form className='register-form' id='register-form' method='POST'>
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
                    
                        <div className='form-group'>
                            <label htmlFor='adminId'><i className="zmdi zmdi-account zmdi-hc-2x"></i></label>
                            <input type='text' id='adminId' name='adminId' 
                            value= {user.adminId}
                            onChange={handleInput}
                            placeholder='enter id' required ></input>
                        </div>

                    <div className='form-group form-button'>
                        <input type='submit' name='signup' id='signup' className='form-submit' value='register' onClick={PostData}></input>
                    </div>
                    
                    </form>
                           
                    </div>
                </div>
        
    )}

export default CreateAdmin;