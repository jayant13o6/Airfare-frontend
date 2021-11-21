import Navbar from './navbar';
import '../index.css';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { showAlert } from './alert';

const Admin = () =>{
    const history = useHistory();
    //destructure of object
    //syntax const[variable, method_toChangeValue_ofVar] = usestate(initialValue)
    const [user, setUser] = useState({
        adminId:'', password:''
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
        const{adminId, password} = user;
        console.log('data is:',user); // to see data input
        
        const res = await fetch('/admin',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            mode: 'cors',
            // data send to server 
            body: JSON.stringify({adminId, password})
            // body: JSON.stringify({user})
        })
        .then((res)=>{
            const data = res.json(); //to check data
            console.log('res:',res.json)
            console.log(data)
            if (res.status === 400 || !data){
                showAlert('Wrong Credentials','danger')
                console.log('invslid register')
            }   
             else{
            window.alert('valid register');
            console.log('vslid register');
            history.push('/adminUser')
            }
        })
        
        .catch((err)=>console.log(err))
    }
    return(
        <div>
            <Navbar/>
    
            <h1>AirFare</h1>
            <section className='adminlogin'>
                <div className='container mt-5'>
                    <div className='adminlogin-form'>
                    <h2> Admin Login:</h2>
                    <form className='adminLogin-form' id='adminlogin-form' method='POST'>
                        <div className='form-group'>
                            <label htmlFor='adminId'><i className="zmdi zmdi-email zmdi-hc-2x"></i></label>
                            <input type='text' id='adminId' name='adminId' 
                            value= {user.adminId}
                            onChange={handleInput}
                            placeholder='Your adminId' required ></input>
                        </div>
                        {/* <h2>name is :{user.adminId}</h2> */}
                        
                        <div className='form-group'>
                            <label htmlFor='password'><i className="zmdi zmdi-lock zmdi-hc-2x"></i></label>
                            <input type='password' id='password' name='password'
                               value= {user.password}
                               onChange={handleInput}
                               placeholder='Your password' required ></input>
                        </div>
                        {/* <h2>name is :{user.password}</h2> */}
                    
                    <div className='form-group form-button'>
                        <input type='submit' name='adminlogin' id='adminlogin' className='form-submit' value='adminlogin' onClick={PostData}></input>
                    </div>
                    </form>
                    
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Admin;