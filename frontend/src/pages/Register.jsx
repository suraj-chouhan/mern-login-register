import React, { useState } from "react";
import axios from 'axios'; 
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api/api";

function Register(){
    const [ formData, setFormData ] = useState({
        name:"",
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            if(!formData.name || !formData.email || !formData.password)
            {
                alert("All fields required");
                return;
            } 
            const res = await axios.post(API_URL+"/register",formData)
            alert("Register successfully");
            setFormData({name:"",email:"",password:""});
            navigate("/");
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
    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={formData.name}  name="name" placeholder="Enter Name" onChange={handleChange} />
                <br /><br />
                <input type="email" value={formData.email} name="email" placeholder="Enter Email" onChange={handleChange}/>
                <br /><br />
                <input type="password" value={formData.password} name="password" placeholder="Enter password" onChange={handleChange} />
                <br /><br />
                <button type="submit">Register</button>
            </form>
            <p>
                if already have account  
                <Link to="/">
                    Login
                </Link>
            </p>
        </div>
    )
}

export default Register;