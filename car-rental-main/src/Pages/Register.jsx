
import "./css2/login.css";
import BgShape from "../images/hero/hero-bg.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/providerdata";
import axios from "axios";
import { useContext } from "react";


export default function Register(){


    const history = useNavigate();

    const [user, setUser] = useState({
        name:"",email:"",password:""
    });
    
    let name,value;
    
    const handleInputs=(e)=>{
        
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
        console.log(value);

    }
    const {account,setAccount} = useContext(DataContext);
 
    const PostData = async(e)=>{
        const URL = "http://localhost:8000";
        try{
            e.preventDefault();
            // const {name,email,password} = user;
            let res = await axios.post(`${URL}/signup`,user);
            console.log(res.status);
            alert("Successfully registered Please verify the OTP ");

            setAccount({...account,email:user.email,name:user.name,registered:1});
            history('/otpvarify');
            return;
        }
        catch(error){
            alert("User Already exist with the Email ID You can try Loging IN ");
            history("/signin");
            console.log("api error  :  ",error);
            return; 
        }





        // console.log(email);
        // const res = await fetch("/demo",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type" : "application/json"
        //     },
        //     body: JSON.stringify({
        //         name,email,password
        //     })

        // });

        // const data = await res.json();
        // console.log(data);
        // if(data.status === 422 || !data){
        //     window.alert("Registration failed");
        //     console.log("invalid registration");
        // }else{
        //     window.alert("Registration Successful");
        //     console.log("Successful registration");
        //     history("/otpvarify" ,{ state: { email: email,naam:name} });
        // }

    }

    return(
        <>
        <div className="registerDiv">
        <div className="auth-form-container">
            <h2 style={{fontSize:"2.5rem"}}>Register</h2>
        <form className="register-form" method="POST" onSubmit={PostData}>
            <label htmlFor="name" style={{fontSize:"1.3rem"}}>Full name</label>
            <input name="name" id="name" placeholder="full Name" value={user.name} onChange={handleInputs} required/>
            <label htmlFor="email" style={{fontSize:"1.3rem"}}>email</label>
            <input type="email" placeholder="youremail@gmail.com" id="email" name="email" value={user.email} onChange={handleInputs} required/>
            <label htmlFor="password" style={{fontSize:"1.3rem"}}>password</label>
            <input type="password" placeholder="********" id="password" name="password" value={user.password} onChange={handleInputs} required/><br/>
            <button type="submit" style={{fontWeight:"bold",fontSize:"1.4rem"}} >Register</button>
        </form>
        <br/>
        <a className="a1" href="/signin">Already have an account? Sign In here.</a>
    </div>
    <img className="bg-shape" src={BgShape} alt="bg-shape" />
        </div>
        </>
    );
};