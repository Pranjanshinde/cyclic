const express=require("express");
const { Postmodel } = require("../models/Post.model");

const Postrouter=express.Router();

Postrouter.post("/appointments",async(req,res)=>{
    try {
        const post =new Postmodel(req.body);
        await post.save();
        res.send({"msg":"new post has been added"});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

Postrouter.get("/appointments",async(req,res)=>{
    try {
       let {page,limit,search,sort,spec}=req.query;
       console.log({page,limit,search,sort,spec});
let skip;
let searched;
let sorted;
let speci;
       if(page && limit)
       {
        skip=((page-1)*limit);
       }else{
        page=1;
        limit=100;
        skip=0;
       }

       if(search)
       {
        searched= { };
       }else{
        searched={};

       }

       
        if(sort=="asc")
        {
            sorted={date:1}
        }else{
            sorted={date:-1}
       }
   
       if(spec)
       {
        speci={spec:spec} 
       }else{
        speci={}
       }
       if(skip<0)
       {
        skip=0;
       }

       let data= await Postmodel.find({$and: [speci]}).sort(sorted).skip(skip).limit(limit);
       if(search)
       {
        let filtered=data.filter((item,index)=>{
            return (item.name.toLowerCase(). includes(search.toLocaleLowerCase()));
        });
        res.send(filtered);
       }else{
        res.send(data);
       }

      


    } catch (error) {
        res.send({"msg":error.message});
    }
});

Postrouter.patch("/appointments/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id,123);
        let post= await Postmodel.findOne({_id:id});
        console.log(post,123);
       await Postmodel.findByIdAndUpdate({_id:id},{slots:post.slots-1});
       res.send("user has been updated");
      console.log(id);
    } catch (error) {
        res.send({"msg":error.message});
    }
});





module.exports={Postrouter};


// {
//     "name":"dr sumit",
//        "image":"https://m.media-amazon.com/images/I/614RKrQRHTL._AC_UL600_FMwebp_QL65_.jpg",
//        "spec":"Cardiologist",
//        "exp":2,
//        "location":"thane",
//        "date":"25-10-2023",
//        "slots":4,
//        "fee":800,
//        "userid":"wdewd"
//    }

