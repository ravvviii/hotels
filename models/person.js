
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const passport = require('passport');



// Defining person schema

const personSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['Chef', 'Waiter', 'Manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})






personSchema.pre('save', async function(next){
    const person = this;

    if(!person.isModified('password'))   return next();
    try {

// Salt generation
        const salt = await bcrypt.genSalt(10)


        // Hash password

        const hashedPassword = await bcrypt.hash(person.password, salt)
        person.password = hashedPassword

        next();
    } catch (error) {
        return next(error)
        
    }
    

})




personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password )
        return isMatch
    } catch (error) {
        throw error
    }
}



// Create person model

const Person = mongoose.model("Person", personSchema)

module.exports = Person;