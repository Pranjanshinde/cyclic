const mongoose=require("mongoose");

const PostSchema=mongoose.Schema({
    name:String,
    image:String,
    spec:String,
    exp:Number,
    location:String,
    date:String,
    slots:Number,
    fee:Number
});

const Postmodel=mongoose.model("post",PostSchema);

module.exports={Postmodel};