const express = require('express')
const router = express.Router();
const Menu = require('../models/menu');







// Get Menu

router.get("/getMenu", async(req, res)=>{
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


router.post("/addMenu", async(req, res)=>{
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



// Parametarised menu

router.get('/getMenu/:taste', async (req, res)=>{
    try {



        const taste = req.params.taste;

        if(taste == "Sweet"||taste == "Sour"||taste == "Spicy"){

        const responce = await Menu.find({taste:taste})
        res.status(200).json(responce)
        
        }
        else{
            res.status(404).json({error:"Invalid taste type"})
        }


    } catch (error) {
        console.log("Error while fetching menu", error);
        res.status(500).send(`Menu fetching error`)
    }
})



router.put('/updateMenu/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const responce = await Menu.findByIdAndUpdate(id, updatedData, {
            new:true,
            runValidators:true
        })


        if(!responce){
            res.status(404).json({error:"Menu not found"})
        }


        console.log("Menu updated ");
        
        res.status(200).json(responce)
        



        
    } catch (error) {
        console.log("Error while updating menu", error);
        res.status(500).send(`Menu updating error`)
    }
})





router.delete('/deleteMenu/:id', async (req, res)=>{
    try {

        const id= req.params.id;
        const responce = await Menu.findByIdAndDelete(id);

          if(!responce){
            res.status(404).json({error:"Menu not found"})
        }


        console.log("Menu deleted ");
        
        res.status(200).json({message: "Menu deleted" })
        
    } catch (error) {
        console.log("Error while deleting menu", error);
        res.status(500).send(`Menu deleting error`)
    }
})




module.exports = router