import React,{use, useEffect,useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import API_URL from "../api/api";

function Dashboard(){
    const [data, setData] = useState("");
    const [profile,setProfile] = useState(null);
    const [user,setUser] = useState({});
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
            console.log(res.data.user);
            setData(res.data.message);
            setUser(res.data.user);
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchDashboard();
    },[]);
    const handleImageChange = (e)=>{
        const file = e.target.files[0];

        if(file){
            setProfile(URL.createObjectURL(file));
        }
    }
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navgate("/");
    }

    
    return (
<div
style={{
    minHeight:"100vh",
    background:"#f5f5f5",
    padding:"20px"
}}
>

    <div
    style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        background:"#fff",
        padding:"15px 25px",
        borderRadius:"10px",
        boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
    }}
    >
        <h2>Dashboard</h2>

        <button
            onClick={handleLogout}
            style={{
                background:"red",
                color:"#fff",
                border:"none",
                padding:"10px 20px",
                borderRadius:"5px",
                cursor:"pointer"
            }}
        >
            Logout
        </button>
    </div>

    <div
    style={{
        maxWidth:"500px",
        margin:"30px auto",
        background:"#fff",
        padding:"30px",
        borderRadius:"10px",
        textAlign:"center",
        boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
    }}
    >

        {/*<img
            src={
                profile ||
                "https://via.placeholder.com/150"
            }
            alt="profile"
            style={{
                width:"150px",
                height:"150px",
                borderRadius:"50%",
                objectFit:"cover"
            }}
        />

        <br/><br/>

         <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
        /> */}

        <h2>{user.name}</h2>

        <p>{user.email}</p>

        <hr />

        <h3>{data}</h3>

    </div>

</div>
);
}

export default Dashboard;