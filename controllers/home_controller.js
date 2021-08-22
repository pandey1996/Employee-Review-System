const employeeDB=require('../models/employees');
const reviewDB=require('../models/review');
module.exports.home=async function(req, res){
    if(!req.user){
        res.redirect('/employees/signin');
    }
    let employee=await employeeDB.findById(req.user._id);
    let reviews=await reviewDB.find({
        to: req.user._id
    });
    var recipients=[];
    for(let i=0;i<employee.to.length;i++){
        let tmp=await employeeDB.findById(employee.to[i]);
        //console.log(employee.to[i]);
        recipients.push(tmp);
    }

    return res.render('home',{
        recipients: recipients,
        reviews: reviews
    });
}   