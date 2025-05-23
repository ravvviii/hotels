const mongoose = require('mongoose')


// Defining the mongoDB connection URL

const mongoURL = 'mongodb://localhost:27017/hotels'
// setup MongoDB connection

mongoose.connect(mongoURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db = mongoose.connection;


db.on('connected',()=>{
    console.log(`MongoDB server connected ✅`);
    
})
db.on('error',()=>{
    console.log(`MongoDB server connection error ❌`);
    
})
db.on('disconnected',()=>{
    console.log(`MongoDB server disconnected 🔴`);
    
})




// Export database connection

module.exports = db