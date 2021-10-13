import AdminBar from "./adminBar";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const IndvAdmin = () =>{
    // const history = useHistory();
    // const [userData, setUserData] = useState({});
    // const callpersonalPage = async() =>{
    //     try{ 
    //         const res = await fetch('/indvAdmin', {
    //             method: "GET",
    //             headers: { 
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             credentials:'include'
    //         })

    //             const data = await res.json()
    //             console.log('data in personal:',data)
    //             setUserData(data);
    //             if (!res.status === 200){ 
    //                 const error = new Error(res.error);
    //                 throw error;
    //             }       
    //     }
    //     catch(err){
    //         history.push('/admin')
    //         console.log(err)
    //     }
    // }

    // useEffect(() =>{
    //     callpersonalPage();
    // },[]);

    return(
        <div>
            <AdminBar/>
            <p className='mt-5'>Welcome</p>
            <h1>Admin's Page</h1>
            {/* <p>{userData.Username}</p> */}
        
        </div>
    )
}
export default IndvAdmin;