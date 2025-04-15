const collection = require("./mongodb.js");
const express = require("express");
const app = express();
const path = require("path");

const templatepath = path.join(__dirname, '../templates')
const port = process.env.PORT || 3000

app.use(express.json())
app.get("/", (req,res)=>{
    res.sendFile(path.join(templatepath, "Login.html"))
});

app.use(express.urlencoded({extended:false}))



app.post("/Login",async (req,res)=>{
    try{
    const data={
        name:req.body.name,
        password:req.body.password
    };

    await collection.insertMany([data])
    res.send("Login data saved!");
} catch (error) {
    res.status(500).send("Failed to save login data.");
}
});

app.listen (port, () => {
    console.log("port connected");
});