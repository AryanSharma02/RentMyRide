import express, { response }  from "express";

import User from "../models/user-schema.js";
import mail from "../mail.js";
import mail2 from "../mailReserv.js";
import crypto from "crypto";
import alert from "alert";
import cardata from "../models/Cardata.js";
import reserve from "../models/reservation.js";

const router = express.Router();

router.get("/cardata",async(req,res)=>{
        try{
            const data = await cardata.find({});
            res.status(200).send(data);
        }catch(error){
            res.status(500);
            console.log(error);
        }
});



router.post('/signin',async(req,res)=>{
    try{
        console.log(req.body);
        if(req.body.email == "" || req.body.password==""){
            // alert("please fill the information ");
            return res.status(200).json({message:"blank"});
        }
        let user =  await User.findOne({email:req.body.email,password:req.body.password});
        // console.log(user);
        if(user){
            alert("Signin Succesfully");
            return res.status(200).json({message:user.name});
        }

        let temp = await User.findOne({email:req.body.email});
        if(temp){
            alert("Password Incorrect please check and try again");
            return res.status(200).json({message:"Password incorrect"});
        }
        else{
            alert("No user found please register");
            return res.status(200).json({message:"No User"});
        }


    }catch(error){
        console.log("signin backend : ",error);
        res.status(500).json({message:error.message});
    }
});

router.post('/varify',async(req,res)=>{
    try{
        console.log(req.body);

        let user = await User.findOne({email:req.body.email,otp:req.body.otp});
        
        if(user){
            alert("Otp Succefully verified ");
            return res.status(200).json({message:"OTP Varified"});

        }else{
            return res.status(401).json("Invalid Login");
        }

    }
    catch(error){
        console.log("varify backend : ",error);
        res.status(500).json({message:error.message});
    }
});

router.post('/reservebooking',async(req,res)=>{
    try{

        // console.log(req.body);

        const info = req.body;
        const newReserv = new reserve(info);
        await newReserv.save();

        var d1 = await cardata.findOne({name:info.cartype});
        const upd = d1.stock - 1;
        console.log(info.pickdate,info.dropdate,info.picktime,info.droptime);
        //2023-06-09 2023-06-10 19:04 20:03
        var pickd = info.pickdate[8]+info.pickdate[9];
        var dropd = info.dropdate[8]+info.dropdate[9];
        var diff = dropd-pickd;
        var payment = (diff+1)*d1.price;
        const price = d1.price;
    

        await cardata.updateOne({name:info.cartype},{stock:upd});

        let ans = mail2(info,payment);

        res.status(200).json({message:"saved"});

    }catch(error){
        console.log("reserving backend : ",error);
        res.status(500).json({message:error.message});
    }
});


router.post('/signup',async(req,res)=>{
    try{    

        const user = req.body;
        
        var rdno=crypto.randomInt(1000,99999 );
        user.otp = rdno;
        const exist = await User.findOne({name:req.body.email});
        if(exist){
            return res.status(401).json({message:"User already exists"});
        }

        const newUser = new User(user);
        
        await newUser.save();
        let ans = mail(rdno,req.body.email);
        
        res.status(200).json({message:  user});

    }
    catch(error){
        console.log("routes mein  : " , error);
        res.status(500).json({message:error.message});
    }
});


export default router;