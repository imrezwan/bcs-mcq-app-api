const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');
const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'bcs_target',
})

connection.connect((err)=>{
    if(!!err){
        console.log('ERROR')
    }
    else{
        console.log('Connected to MySQL')
    }
})

app.use(express.json());

let courses = [
    {
        id: 1,
        name: 'first course',
    },
    {
        id: 2,
        name: 'second course'
    }
]

app.get('/', (req, res)=>{

    connection.query('SELECT * FROM users where phone=01742738142', (err, rows, fields)=>{
        if(!!err)res.status(400).json({error: err});
        res.status(200).json(rows);
    })
    //res.send("hello world");
});

app.get('/api/courses/:id', (req, res)=>{
    res.send(req.query);
})

app.post('/api/courses', (req, res)=>{

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    const { error, value } = schema.validate(req.body);
    console.log(value, error);

    if(error){
        res.status(400).send(error.message);
        return;
    }

    const course = {
        id: courses.length+1,
        name: req.body.name,
    };

    courses.push(course);
    res.send(course);
})


const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening ${port} port...`));