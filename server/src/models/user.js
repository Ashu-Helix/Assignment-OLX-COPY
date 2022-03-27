const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
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
        type:String,
        required:true,
        trim:true
    }
});

userSchema.methods.getAuthTokenfunction = async function(){
    try{
        const token = await jwt.sign({id: this.id}, process.env.TOKEN_KEY);
        return token;
    }catch(err){
        console.log(err);
    }
};

userSchema.pre('save', async function(req, res, next){
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

const User = mongoose.model('user', userSchema);
module.exports = User;