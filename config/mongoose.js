const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authentication');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connection to Mongo DB"));

db.once('open', function(){
    console.log('Connected to Database');
});

module.exports = db;