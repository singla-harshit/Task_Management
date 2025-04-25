const express = require('express')
const User = require("../models/users.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const cookie_parser = require('cookie-parser')

const registerUser = async (req,res,next)=>{
    try{
        const {firstName , lastName , email , password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(402).json({"message":"Insufficient Data"});
        } 

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        }); 
        
        const token = jwt.sign({
            id : newUser._id,
            email:newUser.email,
            firstName : newUser.firstName,
            lastName : newUser.lastName,
        },process.env.JWT_SECRET_TOKEN,{expiresIn:"7d"})


        res.cookie("authToken", token, {
            httpOnly: true,          // Cannot be accessed via JavaScript (XSS safe)
            secure: true,            // Only over HTTPS
            sameSite: "Strict",      // Or 'Lax' or 'None' depending on cross-site usage
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          return res.status(201).json({
            message: "User registered successfully",
            user: {
              id: newUser._id,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
            },
          });
          
    }
    catch(error){
        console.log(error);
        return res.status(500).json({"message":"Internal Server Error Error caught"})
    }
}   

const loginUser = async (req , res , next)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(402).json({"message":"Insufficient Data"});
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                uniqueId: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            process.env.JWT_SECRET_TOKEN,
            { expiresIn: '7d' }
        );

        res.cookie('authToken', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });  // Cookie valid for 7 days
        res.status(200).json({ message: 'Login successful', token });  // Optionally send token in response body

    }catch (error) {
        console.log("Error caught logging in ",error);
        return res.status(500).json({"message":"Error from the internal server"});
    }
}

module.exports = {registerUser,loginUser};