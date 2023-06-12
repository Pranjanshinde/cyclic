const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    email:String,
    password:String
});

const usermodel=mongoose.model("user",userschema);

module.exports={usermodel}