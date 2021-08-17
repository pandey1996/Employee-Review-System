const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
    employeeID : {
        type : String,
        required :  true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        unique : true,
        required : true
    }

});