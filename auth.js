const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;





// Models
const Person = require('./models/person')




// Authentication using passport

passport.use(new LocalStrategy(async(USERNAME, PASSWORD, done)=>{
    try {

        const user = await Person.findOne({username:USERNAME});
        if(!user){
            return done(null, false, {message:"Invalid Username"})
        }

        const isPasswordMatch = await user.comparePassword(PASSWORD)

        if(isPasswordMatch){
            return done(null, user)

        }
        else{
            return done(null, false, {message:"Invalid password"})
        }
        
    } catch (error) {
       return  done(error)
        
    }
}))




module.exports = passport