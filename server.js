const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const db = require('./db')


// Models
const Person = require('./models/person')
const Menu = require('./models/menu')


// Body-Parser middleware
app.use(bodyParser.json());  // It will save in req.body






app.get('/', (req, res)=>{
    res.send("Hello i am alive! ")
})



// Person
app.post('/person',async (req, res)=>{

   try {

     const data = req.body;

    const newPerson = new Person(data);


 const responce =   await newPerson.save();
 console.log("Data Saved");
 
res.status(200).json(responce)


    
   } catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal Server error'})
    
   }
})



// Person
app.get("/getpersonDetails", async(req, res)=>{
        try {

            const data = await Person.find();
            console.log(`Person data fetched successfully`);
            
            res.status(200).send(data)
            
        } catch (error) {  
            console.log("Error while fetching data ", error);
            res.status(500).send(error)
            

        }
})





// Get Menu

app.get("/getmenuItem", async(req, res)=>{
    try {

        const data = await Menu.find();
        console.log(`Menu details fetched ✅ `);
        res.status(200).json(data)
        
    } catch (error) {
        console.log("Error while fetching menu", error);
        res.status(500).send(`Menu fetching error`)
    }
})




// Post Menu


app.post("/menuItem", async(req, res)=>{
    try {
        const data = req.body;
        const menuItem = new Menu(data)

        const responce = await menuItem.save();
        console.log(`Menu details saved `);
        res.status(200).json(responce)
        

        
    } catch (error) {
        console.log("Error while adding menu", error);
        res.status(500).send(`Menu saving error`)
        
        
    }
})

app.listen(3000, ()=>{
    console.log(`\nServer is started on localhost: 3000`);
    
});  