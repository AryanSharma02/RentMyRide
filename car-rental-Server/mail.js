"use strict";
import nodemailer from "nodemailer";
     async function main(otp,email) {
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

  
  let varifyurl ='<a href="http://myweb.com/varifyemail?email='+email+'&otp='+otp+'">click to varify</a>';
 let info=await transporter.sendMail({
    from: '"RentMyRide" <aryandps9872@gmail.com>', // sender address
    to: email,  
    subject: "Account Varification mail:-",       
    html: "<h2>Please enter otp in form and varify your account :- OTP "+otp+" </h2> <br/> <h2>alternatively you can click on the link below</h2><p>"+varifyurl+"</p>",
  }); 

  console.log("Message sent: "+info.messageId);


  if(info.messageId)
  return true;
  else
  return false;

}

export default main;
//  main().catch(console.error);  
// main(otp,email).catch(console.error);
// ---------------------------------------------------------------
// async function main() {
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',	
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: "aryandps9872@gmail.com",  
//         pass: "icancbszokdxzzxa",  
//       },
//     });
  
    
//     // let varifyurl ='<a href="http://myweb.com/varifyemail?email='+email+'&otp='+otp+'">click to varify</a>';
//    let info=await transporter.sendMail({
//       from: '"RentMyRide" <aryandps9872@gmail.com>', // sender address
//       to: "aryan1499.be20@chitkara.edu.in",  
//       subject: "Account Varification mail:-",       
//       html: "<h2>Please enter otp in form and varify your account :- OTP"+" </h2> <br/> <h2>alternatively you can click on the link below</h2><p></p>",
//     }); 
  
//     console.log("Message sent: "+info.messageId);
  
  
//     if(info.messageId)
//     return true;
//     else
//     return false;
  
//   }
  
  
  //  main().catch(console.error);  
  // main(otp,email).catch(console.error);
  

