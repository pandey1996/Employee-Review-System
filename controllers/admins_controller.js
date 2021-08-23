const employeeDB=require('../models/employees');

module.exports.adminPage=async function(req, res){
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
        else{
            req.flash('success','Welcome Admin');
            return res.render('adminPage');
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
        else{
            let reviewer=await employeeDB.findOne({
                email: req.body.Reviewer
            });
            if(!reviewer){
                req.flash('error','Reviewer Not Valid');
                return res.redirect('back');
            }
    
            let recipient=await employeeDB.findOne({
                email: req.body.Recipient
            });
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