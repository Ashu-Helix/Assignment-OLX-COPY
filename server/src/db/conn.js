const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.dbURL, ()=>{
    console.log('connection successful');
});