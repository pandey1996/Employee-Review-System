const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
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

const employeeDB=mongoose.model('EmployeeDB',employeeSchema);
module.exports=employeeDB;