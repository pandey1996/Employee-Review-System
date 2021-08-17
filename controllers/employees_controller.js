const employeeDB=require('../models/employees');

module.exports.signUp=function(req,res){
    res.render('signup');
}

module.exports.createUser=function(req,res){
    if(req.body.password==req.body.conpass){
        employeeDB.create({
            
        });
    }
}