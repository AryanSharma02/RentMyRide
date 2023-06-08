

import React from 'react';
import "./css2/signin.css";
import BgShape from "../images/hero/hero-bg.png";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../context/providerdata';
import axios from 'axios';

function Signin() {
  const history = useNavigate();
  
  const [user, setUser] = useState({
    email:"",password:""
  });

  let name,value;
  
  const handleInputs=(e)=>{
        
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value});
    console.log(value);

}


const {account,setAccount} = useContext(DataContext);

  
  const CheckUser = async(e)=>{

        
    const URL = "http://localhost:8000";
    try{

        e.preventDefault();

        let res = await axios.post(`${URL}/signin`,user);

        console.log(res.data.message);
        if(res.data.message === "No User"){ 
          history("/register");
          return;
        }else if(res.data.message === "blank"){
          window.alert("please fill details dont leave empty");
          return;
        }else if(res.data.message === "Password incorrect"){
          window.alert("incorrect password");
          return;
        }

        setAccount({...account,name:res.data.message,email:user.email,registered:1});
        history("/");


    }
    catch(error){
      console.log("post login axios : ",error);
    }
        // const {email,password} = user;
        // const res = await fetch("/checkuser",{
        //   method:"POST",
        //   headers:{
        //     "Content-Type" : "application/json"
        //   },
        //   body: JSON.stringify({
        //     email,password
        //   })
        // });
        // const data = await res.json();
        // if(data.status === 422 || !data){
        //   window.alert("Login failed");
        //   console.log("Login failed");
        // }else{
        //   window.alert("Login Success");
        //   console.log("Login Success");
        //   history("/");
        // }
  }


  return (

   
    <div className="signinDiv"> 
        <div className="auth-form-container">
          <h2 style={{fontSize:"2.5rem"}} >Sign In</h2>
          <form className="login-form" method='POST'>
            <label htmlFor="email" style={{fontSize:"1.5rem"}}>email</label>
            <input type="email" placeholder="youremail@gmail.com" id="email" name="email" required value={user.email} onChange={handleInputs}/>
            <label htmlFor="password" style={{fontSize:"1.5rem"}}>password</label>
            <input type="password" placeholder="********" id="password" name="password" required onChange={handleInputs} value={user.password}/><br/>
            <button type="submit" onClick={CheckUser}>Sign In</button>
          </form>
          <br/>
          <a className='a1' href='/register'>Don't have an account? Register here.</a>
        </div>
        <img className="bg-shape" src={BgShape} alt="bg-shape" />
    </div>
   
  );
}

export default Signin;