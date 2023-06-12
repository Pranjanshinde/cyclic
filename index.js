const express=require("express");
const { connection } = require("./db");
const { Userrouter } = require("./routes/User.route");
const { Postrouter } = require("./routes/Postrouter");
const { Auth } = require("./middleware/Auth");
var cors = require('cors');

let app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Home Page")
});

app.use("/users",Userrouter);

app.use(Auth)
app.use("/posts",Postrouter);


app.listen(8080,async()=>{
try {
    console.log("connecting.....");
    await connection;
    console.log("connected");
} catch (error) {
    res.send({"msg":error.message});
}
});