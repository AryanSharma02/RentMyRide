import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BgShape from "../images/hero/hero-bg.png";
import { useContext } from "react";
import { DataContext } from "../context/providerdata";
import axios from "axios";

export default function Otpvarify(){
    const history = useNavigate();
    // const {state} = useLocation();
    // const { email,naam } = state;
    const [user, setUser] = useState({
        otp:""
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

            const {otp} = user;

            const temp = {
                email:account.email,
                otp:otp
            };

            let res = await axios.post(`${URL}/varify`,temp); 
            console.log(res);
            
            history('/');
            

        }
        catch(error){
            console.log("post on otp varify : ",error);
        }




        // const {otp} = user;
        // const res = await fetch("/varify",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type" : "application/json"
        //     },
        //     body: JSON.stringify({
        //         email,otp,naam
        //     })

        // });

        // const data = await res.json();
        // console.log(data);
        // if(data.status === 422 || !data){
        //     window.alert(data.message);
        //     console.log(data.message);
        // }else{
        //     window.alert("Succesfull verification Please SIGNUP");
        //     console.log("Successful varification Please SIGNUP");
        //     history("/signin",{state:{nam:naam}});
        // }

    }


    return(
        <>
            <div className="signinDiv"> 

                <div className="auth-form-container">
                <h2 style={{fontSize:"2rem"}}>OTP VERIFICATION</h2>
                <form className="login-form">
                    <label htmlFor="email" style={{fontSize:"1.5rem"}}>Verify the OTP sent to your email</label>
                    <input type="email" placeholder={account.email} id="readonly" name="ronly" readOnly value={account.email}/>
                    <label htmlFor="otp" style={{fontSize:"1.5rem"}}>OTP</label>
                    <input type="number" placeholder="Enter the OTP" id="otp" name="otp" value={user.otp} onChange={handleInputs}/><br/>
                    <button type="submit" onClick={PostData}>Verify</button>
                </form>
                <br/>
                
                </div>
                <img className="bg-shape" src={BgShape} alt="bg-shape" />
            </div>
        </>
    );
}