const employeeDB=require('../models/employees');
const empID=require('../config/employeeID_gen');
const passport=require('passport');

module.exports.signUp=function(req,res){
    res.render('signup');
}

module.exports.signIn=function(req, res){
    res.render('signIn');
}

module.exports.createUser=function(req,res){
    if(req.body.password==req.body.conpass){
        employeeDB.create({
            employeeID : empID.employeeID(),
            name : req.body.name,
            isAdmin : false,
            email : req.body.email,
            password : req.body.password
        },function(err){
            if(err){
                console.log('Error : ',err);
                return res.redirect('back');
            }
            else{
                console.log('New user Created');
                return res.redirect('back');
            }
        });
    }
}

module.exports.createSession=function(req, res){
    return res.redirect('/');

}