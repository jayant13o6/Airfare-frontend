import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";


const AdminLogout = ()=>{
    const history = useHistory();    
    // //promise
    useEffect(() => {
        fetch('/adminlogout', {
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
        })
    return (
        <div>
            <h1>LOGOUT occur!!!</h1>
        </div>
    )
    }

export default AdminLogout