const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const db = require('./db')
const personRoute = require('./routes/personRoutes')
const menuRoute = require('./routes/menuRoute')
require('dotenv').config();

// Models
const Person = require('./models/person')
const Menu = require('./models/menu')


// Body-Parser middleware
app.use(bodyParser.json());  // It will save in req.body



app.get('/', (req, res)=>{
    res.send("Welcome to our Hotel !!")
})


// Import person router file
app.use('/person', personRoute)
// Import Menu router file
app.use('/menu', menuRoute)



const Port = process.env.PORT ||3000


app.listen(Port, ()=>{
    console.log(`\nServer is started on localhost: 3000`);
    
});  