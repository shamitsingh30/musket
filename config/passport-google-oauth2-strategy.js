const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

// tell passport to use new strategy fo google login
passport.use(new googleStrategy({
        clientID: "1079490264117-4cot72teii8nn8v803psqdt34425jd72.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    }, 
    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('Error in google strategy-passport', err); return;}

            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
            console.log(profile);

            if(user){
                // if user found, set tis user as req.user
                return done(null, user);
            }else{
                // if not found, create this user and set it is req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')    //creating random password
                }, function(err, user){
                    if(err){console.log('Error in creating user', err); return;}

                    return done(null, user);
                })
            }
        })
    }
));

module.exports = passport;