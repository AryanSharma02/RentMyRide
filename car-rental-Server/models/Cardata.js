import mongoose, { mongo } from "mongoose";

const Cardata = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    img:{
        type:String,
        required:true
    } , 
    model:{
        type:String,
        required:true
    }
    , 
    mark:{
        type:String,
        required:true
    }
    , 
    year:{
        type:String,
        required:true
    }
    , 
    doors:{
        type:Number,
        required:true
    }
    , 
    air:{
        type:String,
        required:true
    }   
    , 
    transmission:{
        type:String,
        required:true
    }
    , 
    fuel:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }

});

const cardata = mongoose.model('cardata',Cardata,'Car-Data');
export default cardata;
