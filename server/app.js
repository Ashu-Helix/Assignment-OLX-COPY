const express = require('express');
const app = express();
require('dotenv').config();
require('./src/db/conn');
const port = process.env.port || 8080;

app.use(express.json());
app.use(require('./src/routes/route'));


app.listen(port, ()=>{
    console.log(`server is running on port ${port}...`);
});