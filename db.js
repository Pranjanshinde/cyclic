const mongoose=require("mongoose");

let connection = mongoose.connect(`mongodb+srv://pranjanshinde:pranjanshinde@cluster0.q8f2diw.mongodb.net/bikers?retryWrites=true&w=majority`)

module.exports={connection};