const express = require("express");
const app = express();
require("dotenv").config();
const { connectDB } = require("./db");
const port = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true
}));

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




app.get("/", (req, res) => {
  res.end("Server is running");
});