const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ForgotPassword = require('../models/forgotPass');
const passMailer = require('../mailers/password_mailer');
const { runInNewContext } = require('vm');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    })
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('Multer Error');
                    return;
                }
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            console.log('Error:', err);
            return res.redirect('back');
        }
        
    }else{
        return res.status(401, send('Unauthorized'));
    }
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Sign Up"
    })
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in', {
        title: "Sign In"
    })
}

module.exports.forgotPass = function(req, res){
    return res.render('forgot_password', {
        title: "Forgot Password"
    })
}

module.exports.getEmail = async function(req, res){

    try{
        let user = await User.find({email: req.body.email});
        let accessToken;

        if(user){
            accessToken = crypto.randomBytes(20).toString('hex');
            
            await ForgotPassword.findOneAndUpdate({
                email: req.body.email,
                accessToken: accessToken,
                isValid: true
            },  { expire: new Date() }, { upsert: true, new: true, setDefaultsOnInsert: true });

            passMailer.newPassword(req.body.email);

            return res.send(`<h1>Email has been sent to ${req.body.email}</h1>`);
        }else{
            console.log("This email has not been registered in Codeial");
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in checking valid email', err);
        res.redirect('back');
    }

}

module.exports.resetPass = async function(req, res){
    console.log(req.query);
    let user = await ForgotPassword.findOne({accessToken: req.query.accessToken});
    
    if(user){
        return res.render('password_form', {
            title: "Password Form",
            email: user.email
        });
    }else{
        return res.send("<h1>No user found</h1>")
    }
}

module.exports.setPass = async function(req, res){

    console.log("Inside set password");
    console.log(req.query.email);
    
    if(req.body.password == req.body.confirm_password){
        // let field = await ForgotPassword.find({accessToken: req.query.accessToken});
        // if(field){
            try{
                let user = await User.findOneAndUpdate({email: req.query.email}, {password: req.body.password});
                if(user){
                    ForgotPassword.findOneAndUpdate({isValid: false});
                    return res.render('user_sign_in', {title: "Sign In"});
                }
            }catch(err){
                console.log("Error in updating Password", err);
                res.redirect('back');
            }
            
        // }
    }else{
        console.log("Password and Confirm password did not match");
        return res.redirect('back');
    }
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect('/');
}
