const express = require('express')

const Person = require('../models/person')
const router  = express.Router();


// Person Post
router.post('/addPersonDetails',async (req, res)=>{

   try {

     const data = req.body;

    const newPerson = new Person(data);


 const responce =   await newPerson.save();
 console.log("Admin Data Saved");
 
res.status(200).json(responce)


    
   } catch (error) {
    console.log(error);
    res.status(500).json({error:'Admin data Saving error'})
    
   }
})


router.get("/", (req, res)=>{
    try {
        res.status(200).json({message:"Admin rpute working without authentication"})
        
    } catch (error) {
        res.status(500).json({error:error})
        
    }
})




module.exports = router