import mongoose, { mongo } from "mongoose";

const contactUs = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        min:5,
        max:30
    },
    Tellus:{
        type:String,
        required:true
    },

});

const contact = mongoose.model('contactUs',contactUs);
export default contact;
