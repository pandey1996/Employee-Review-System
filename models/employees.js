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
        required : true
    },
    to:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EmployeeDB'
        }
    ],
    from:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
},{
        timestamps: true
});

const employeeDB=mongoose.model('EmployeeDB',employeeSchema);
module.exports=employeeDB;