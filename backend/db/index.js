require('dotenv').config({path:'../.env'});
const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.DB_URI}${process.env.DB_NAME}`)
        console.log("MongoDB Connected")
    }
    catch(err){
        console.log("Error Connecting MongoDB : ",err);
        process.exit(1);
    }
}


module.exports = {connectDB}
