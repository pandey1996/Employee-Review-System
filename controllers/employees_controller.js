const employeeDB=require('../models/employees');


module.exports.signUp=function(req,res){
    if(!req.isAuthenticated())
        return res.render('signup');
    req.flash('You are already Signed In ');
    return res.redirect('back');
}

module.exports.signIn=function(req, res){
    if(!req.isAuthenticated())
        return res.render('signIn');
    req.flash('You are already Signed In ');
    return res.redirect('back');
}

module.exports.createUser=async function(req,res){

    try{
        if(req.body.password==req.body.conpass){
            let currEmployees=await employeeDB.find({});
    
            await employeeDB.create({
                employeeID : currEmployees.length+12101000,
                name : req.body.name,
                isAdmin : false,
                email : req.body.email,
                password : req.body.password
            });
    
            console.log('New user Created');
            req.flash('success','Signed Up Succesfully!!');
            return res.redirect('/employees/signin');
        }
        else{
            console.log('Error : ');
            req.flash('error','Passwords donot match');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error : ',err);
        req.flash('error','User already exists');
        return res.redirect('back');
    }
}

module.exports.createSession=function(req, res){
    req.flash('success','You have successfully Signed In !!!');
    
    return res.redirect('/');
}
module.exports.deleteSession=function(req,res){
    req.logout();
    req.flash('success','Logged Out successfully');
    return res.redirect('/');
}


