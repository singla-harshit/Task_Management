const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.end("Server is running");
})

app.listen(port , ()=>{
    console.log(`server is running at http://localhost:${port}`);
})  