const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');
const app = express();
const dotenv = require('dotenv');
const {connection} = require('./sqlQueries');
const userHandler = require("./routeHandler/userHandler");
const examHandler = require("./routeHandler/examHandler");
dotenv.config();
app.use(express.json());

connection.connect((err)=>{
    if(!!err){
        console.log('ERROR')
    }
    else{
        console.log('Connected to MySQL')
    }
})

app.use("/api", userHandler);
app.use("/api", examHandler);

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening ${port} port...`));