import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";


const Logout = ()=>{
    const history = useHistory();    
    // //promise
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: { 
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials: "include"
        }).then((res)=>{
            
            if (res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{console.log(err)})
        history.push('/login',{replace: true});
        // useEffect(()=>{
        //     axios.get('/logout')
        //     .then((res)=>{
        //         console.log(res)
        //         history.push('./')
        //     })
        //     .catch((err) => {console.log(err)})
        // },[])

    })
    return (
        <div>
            <h1>LOGOUT occur!!!</h1>
        </div>
    )
    }

export default Logout