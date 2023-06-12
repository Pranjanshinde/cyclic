const express=require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { usermodel } = require("../models/User.module");
const Userrouter=express.Router();

Userrouter.post("/signup",async(req,res)=>{
  try {
    const {email,password}=req.body;
    bcrypt.hash(password, 3, async function(err, hash) {
        // Store hash in your password DB.
        const user=new usermodel({
            email:email,
            password:hash
        });
        await user.save();
        res.send({"msg":"new user registered"});
    });
  } catch (error) {
    res.send({"msg":error.message});
  }
});


Userrouter.post("/login",async(req,res)=>{
    try {
        const user=await usermodel.findOne({email:req.body.email});
        if(user)
        {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                // result == true
               if(result)
               {
                var token = jwt.sign({ userid: user._id }, 'masai');
                res.send({"token":token,"mag":"login successfull","user":user});
               }else{
                res.send("wrong credentials");
               }
            });
        }
    } catch (error) {
        res.send({"msg":error.message});
    }
});




module.exports={Userrouter};


// {
//     "email":"sumit@123",
//          "password":"sumit"
//     }