const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');
const env = require('./environment');

// tell passport to use new strategy fo google login
passport.use(new googleStrategy({
        clientID: env.google_clientID,
        clientSecret: env.google_clientSecret,
        callbackURI: env.google_callbackURI
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