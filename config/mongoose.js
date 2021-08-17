//Mongoose DB connection file

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/EmployeeReviewSystem_Dev');

const db=mongoose.connection;

db.on('error',console.error.bind("Error in Connecting to DB"));

db.once('open',function(){
    console.log('Mongo Connected Successfully');
});

module.exports=db;
