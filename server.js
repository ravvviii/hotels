const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const db = require('./db')
const personRoute = require('./routes/personRoutes')
const menuRoute = require('./routes/menuRoute')
require('dotenv').config();



const passport = require('./auth')
// Models
const Person = require('./models/person')
const Menu = require('./models/menu')

// Creating middleware login

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleDateString()}] Request made to ${req.originalUrl}`);
    next();

}

app.use(passport.initialize());


// Agar aise use kiye to saare route pe laag jayega 
app.use(logRequest)


// Body-Parser middleware
app.use(bodyParser.json());  // It will save in req.body



app.get('/', (req, res) => {
    res.send("Welcome to our Hotel !!")
})

const LocalauthMiddleware = passport.authenticate('local', { session: false })


app.post('/', LocalauthMiddleware, (req, res) => {
    res.send("Welcome to our Hotel !!")
})

// Import person router file
app.use('/person', LocalauthMiddleware, personRoute)
// Import Menu router file
app.use('/menu', LocalauthMiddleware, menuRoute)






// Aise use karenge to specific menu rpute pe hi lagega 
// app.use('/menu',logRequest, menuRoute)



const Port = process.env.PORT || 3000


app.listen(Port, () => {
    console.log(`\nServer is started on localhost: 3000`);



});   