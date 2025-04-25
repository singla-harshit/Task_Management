const express = require("express");
const app = express();
require("dotenv").config();
const { connectDB } = require("./db");
const port = process.env.PORT || 8000;
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const cookieParser = require("cookie-parser");


app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());

connectDB().then(() => {
  app.on("error",(err)=>{
    console.log("ERROR in app " , err)
    throw err;
  }) 
  app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
  }); 
})
.catch((error) => {
    console.log(error);
});

app.use('/',userRoutes);




app.get("/", (req, res) => {
  res.end("Server is running");
});