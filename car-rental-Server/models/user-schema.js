import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:30
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    }

});

const user = mongoose.model('User',userSchema);
export default user;
