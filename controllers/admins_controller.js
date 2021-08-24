const employeeDB=require('../models/employees');

module.exports.adminPage=async function(req, res){
    if(!req.isAuthenticated()){
        req.flash('error','Please Sign In');
        return res.redirect('/employees/signin');
    }
    else{
        if(req.user.isAdmin==false){
            console.log('Not Admin');
            req.flash('error','Not valid access rights');
            return res.redirect('/');
        }
        else{
            try{
                let employees=await employeeDB.find({});
                var employeeList=[];
                for(let i=0;i<employees.length;i++){
                    var tmp={
                        name: employees[i].name,
                        id: employees[i].id
                    }
                    employeeList.push(tmp);
                }
                console.log(employeeList);
                req.flash('success','Welcome Admin');
                return res.render('adminPage',{
                    employeeList: employeeList,
                });
            }
            catch(err){
                console.log(err);
                return;
            }
        }
    }
}

module.exports.setReviewers=async function(req,res){
    if(!req.isAuthenticated()){
        req.flash('error','Please Sign In');
        return res.redirect('/employees/signin');
    }
    else{
        let employee=await employeeDB.findById(req.user._id);
        if(employee.isAdmin==false){
            console.log('Not Admin');
            req.flash('error','Not valid access rights');
            return res.redirect('/');
        }
        else if(req.body.Reviewer==req.body.Recipient){
            req.flash('error','Same user in both fields');
            return res.redirect('back');
        }
        else{
            let reviewer=await employeeDB.findById(req.body.Reviewer);
            if(!reviewer){
                req.flash('error','Reviewer Not Valid');
                return res.redirect('back');
            }
    
            let recipient=await employeeDB.findById(req.body.Recipient);
            if(!recipient){
                req.flash('error','Recipient Not Valid');
                return res.redirect('back');
            }

            reviewer.to.push(recipient);
            reviewer.save();
            recipient.from.push(reviewer);
            recipient.save();
            req.flash('Reviewer Added');
            return res.redirect('back');
        }
    }
}

module.exports.newAdmin=async function(req, res){
    if(!req.isAuthenticated()){
        req.flash('error','Please Sign In');
        return res.redirect('/employees/signin');
    }
    if(req.user.isAdmin==true){
        let employee=await employeeDB.findById(req.body.newAdmin);

        if(!employee){
            req.flash('error','The employee does not exist');
            return res.redirect('back');
        }
        if(employee.isAdmin==true){
            req.flash('error','The employee is already Admin');
            return res.redirect('back');
        }
        if(employee.isAdmin==false){
            employee.isAdmin=true;
            employee.save();
            
            req.flash('success','The employee is set to Admin');
            return res.redirect('back');
        }
    }
}