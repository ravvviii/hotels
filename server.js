const express = require('express')
const app = express()


app.get('/', (req, res)=>{
    res.send("Hello i am alive! ")
})


app.listen(3000, ()=>{
    console.log(`Server is started on localhost: 3000`);
    
});