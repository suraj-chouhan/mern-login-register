import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import API_URL from '../api/api';

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
            const res = await axios.post(API_URL+"/login",formData);
            
            localStorage.setItem(
                "token",
                res.data.token
            );
            navigate("/dashboard");
            
        }catch(error){
            if(error.response)
            {
                alert(error.response.data.message);
            }
            else{
                alert("something went wrong");
            }
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
            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Register Here
                </Link>
            </p>
        </div>
    )
}

export default Login;