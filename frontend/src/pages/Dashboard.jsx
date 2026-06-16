import React,{use, useEffect,useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api";

function Dashboard(){
    const [data, setData] = useState("");
    const navgate = useNavigate();
    const fetchDashboard = async()=>{
        try{
            const token = localStorage.getItem("token");
            const res = await axios.get(API_URL+"/dashboard",
                {
                    headers:{
                        Authorization:token
                    }
                }
            );
            setData(res.data.message);
            
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchDashboard();
    },[])
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navgate("/login");
    }
    return(
        <div>
            <div style={{display:"flex"}}>
                <div style={{width:"61%",textAlign:"end"}}>
                    <h1>Dashboard</h1>
                </div>
                <div style={{width:"39%",textAlign:"end"}}>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div><h2>{data}</h2></div>
        </div>
    )
}

export default Dashboard;