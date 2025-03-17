const express = require('express');
const app = express();
require('dotenv').config();
const { connectDB } = require('./db');
const port = process.env.PORT || 5000   ;

connectDB()

app.get('/',(req,res)=>{
    res.end("Server is running");
})




app.listen(port , ()=>{
    console.log(`server is running at http://localhost:${port}`);
})  