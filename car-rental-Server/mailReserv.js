"use strict";
import nodemailer from "nodemailer";
     async function main2(data,pay) {
  let transporter = nodemailer.createTransport({
	  service: 'gmail',	
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "aryandps9872@gmail.com",  
      pass: "icancbszokdxzzxa",  
    },
  });

 
 let info=await transporter.sendMail({
    from: '"RentMyRide" <aryandps9872@gmail.com>', // sender address
    to: data.email,  
    subject: "Car Reservation Confirmation:- ",       
    html: "<h2> Confirming your reservation details :-  </h2> <br/> <table border=1><tr><td>Name</td><td>"+data.f_name+" "+data.l_name+"</td></tr><tr><td>Car</td><td>"+data.cartype+"</td></tr><tr><td>PickUp Location</td><td>"+data.pickup+"</td></tr><tr><td>DropOff Location</td><td>"+data.dropoff+"</td></tr><tr><td>PickUp Data | Time</td><td>"+data.pickdate+" "+data.picktime+"</td></tr><tr><td>DropOff Data | Time</td><td>"+data.dropdate+" "+data.droptime+"</td></tr><tr><td>Amount to be paid</td><td>"+pay+"</td></tr></table>",
  }); 

  console.log("Message sent: "+info.messageId);


  if(info.messageId)
  return true;
  else
  return false;

}

export default main2;