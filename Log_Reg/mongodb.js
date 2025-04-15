const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/LoginRegister", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("mongoose connected");
})
.catch((err)=>{
    console.log("failed to connect", err);
})

const LogInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const collection = new mongoose.model("Collection1",LogInSchema);

module.exports = collection; // Export the collection modelm