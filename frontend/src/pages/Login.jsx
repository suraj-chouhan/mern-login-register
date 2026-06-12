import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login(){
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            if(!formData.email || !formData.password)
            {
                alert("All Fields Required");
                return;
            }
            const res = await axios.post("http://localhost:3000/api/login",formData);
            
            localStorage.setItem(
                "token",
                res.data.token
            );
            navigate("/dashboard");
            
        }catch(error){
            console.log(error);
        }
        

    }
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token)
        {
            navigate("/dashboard");
        }
    },[]);
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Enter Email" onChange={handleChange}/>
                <br /> <br />
                <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />
                <br /><br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;