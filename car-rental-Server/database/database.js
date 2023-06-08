import mongoose from "mongoose";

export const Connection = async(username,password)=>{
    const URL = `mongodb+srv://${username}:${password}@PROJECT 0.qtljmzf.mongodb.net/?retryWrites=true&w=majority`;
    try{    
        await mongoose.connect(URL,{
            useUnifiedTopology : true,
            useNewUrlParser:true
        });
        console.log("Database Connected");
    }
    catch(error){
        console.log('Error while connecting to database', error.message);
    }
}

export default Connection;