const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userTest = require('./routes/user.js');
// const bodyParser = require ("bodyparser");
// const bodyParser = require('body-parser');
const authroute = require("./routes/auth")
dotenv.config()
mongoose
.connect(
    process.env.MONGO_URL
    )
    .then(()=> console.log("db connected"))
    .catch((err)=>console.log(err));


// app.use(bodyParser.json())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users',userTest)
app.use('/api/auth',authroute)
app.listen(process.env.PORT||3000,()=>{
    console.log("server is created")
})