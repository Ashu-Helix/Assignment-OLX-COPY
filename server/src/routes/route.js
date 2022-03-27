const express = require('express');
const route = express.Router();
const User = require('../models/user');
// const Seller = require('../models/seller');
const bcrypt = require('bcrypt');
const { collection } = require('../models/user');

route.get('/', (req, res)=>{
    res.send('Homepage');
});

route.post('/login', async (req, res)=>{
    const { email, password } = req.body.loginObj;
    
    try{
        if(!email || !password){
            throw new Error("Please fill all fields");
        }

        const isUserExists = await User.findOne({email});
        if(!isUserExists){
            throw new Error("Login Denied");
        }

        const checkPass = await bcrypt.compare(password, isUserExists.password);
        if(!checkPass){
            throw new Error("Login Denied");
        }

        const token = await isUserExists.getAuthTokenfunction();

        res.send(token);
    }catch(err){
        res.status(422).send(err.message);
        console.log(err);
    }
});

route.post('/register', async (req, res)=>{
    
    const { name, email, address, phone, password, conPassword, state, city, pincode } = req.body.registerObj;
    // res.send(`${name} ${email} ${address} ${phone} ${password} ${conPassword} ${state} ${city} ${pincode}`);
    try{    
        if(!name || !email || !phone || !address  || !password || !conPassword || !state || !city || !pincode){
            throw new Error("Please fill all fields");
        }

        // res.send(`${name} ${email} ${address} ${role} ${phone} ${password} ${conPassword} ${state} ${city} ${pincode}`);
        // if(role === "Customer"){
        //     collection_nm = User;
        //     table_nm = "User";
        // }else if(role === "Seller"){
        //     collection_nm = Seller;
        //     table_nm = "Seller";
        // }else{
        //     throw new Error("Invalid Query Request");
        // }

        collection_nm = User;

        const isUserExists = await collection_nm.findOne({email});
        
        if(isUserExists){
            throw new Error("Email already exists");
        }
       
        const isPhoneExists = await collection_nm.findOne({phone});
        if(isPhoneExists){
            throw new Error("Phone already exists");
        }
        
        if(password !== conPassword){
            throw new Error("Password Not Matching");
        }

        const user = new collection_nm({ name, email, phone, address, password, state, city, pincode});
        const saveResult = await user.save();
        if(saveResult){
            res.status(200).send(`Account Created Succesfully`);
            console.log(collection_nm);
        }

    }catch(err){   
        res.status(422).send(err.message);
        console.log(err);
    }
});

module.exports = route;