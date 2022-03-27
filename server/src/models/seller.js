const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:Number,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    pincode:{
        type:Number,
        required:true,
        trim:true
    }
});

sellerSchema.pre('save', async function(req, res, next){
    try{
        if(this.isModified('password')){
            console.log("In Pre MiddleWare");
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    }catch(err){
        console.log(err);
    }
});

const Seller = mongoose.model('seller', sellerSchema);
module.exports = Seller;