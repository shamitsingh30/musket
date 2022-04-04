const mongoose = require('mongoose');

const forgotPassSchema = new mongoose.Schema({
    email:{
        type: String
    },
    accessToken:{
        type: String,
    },
    isValid: {
        type: Boolean
    }
}, {
    timestamps: true
});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPassSchema);
module.exports = ForgotPassword;