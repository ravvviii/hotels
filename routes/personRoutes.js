const express = require('express')

const Person = require('../models/person')
const router  = express.Router();



// Person Post
router.post('/addPersonDetails',async (req, res)=>{

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




// Person get Method
router.get("/getPersonDetails", async(req, res)=>{
        try {

            const data = await Person.find();
            console.log(`Person data fetched successfully`);
            
            res.status(200).send(data)
            
        } catch (error) {  
            console.log("Error while fetching data ", error);
            res.status(500).send(error)
            

        }
})








// Parametarised api 

router.get('/getPersonDetails/:workType', async (req, res)=>{
    
    try {
        const workType = req.params.workType;
        if(workType == 'Chef' ||workType == 'Manager' ||workType == 'Waiter' ){
                const responce = await Person.find({work:workType})
                res.status(200).send(responce)
        }
        else{
            res.status(404).json({error:"Invalid workType"})
        }
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error:"Internal Server Error"})
        
    } 
})

 router.put('/updatePersonDetails/:id',async (req, res)=>{
    try {

        const personId = req.params.id;
        const data = req.body;

        const responce = await Person.findByIdAndUpdate(personId, data, {
            new:true,
            runValidators:true
        })

        if(!responce){
            res.status(404).json({message:'Person not found'})
        }
        console.log(`Person details updated`);
        
        res.status(200).json(responce)
        
    } catch (error) {

         console.log(error);
        
        res.status(500).json({error:"Internal Server Error"})
        
    }
 })



 router.delete('/deletePerson/:id', async (req, res)=>{
    try {


        const id = req.params.id;

        const responce = await Person.findByIdAndDelete(id);
         if(!responce){
            res.status(404).json({message:'Person not found'})
        }
        console.log(`Person Deleted`);
        
        res.status(200).json({Message:"Person deleted successfully"})
        
    } catch (error) {
         console.log(error); 
        
        res.status(500).json({error:"Internal Server Error"})
    }
 })





module.exports = router