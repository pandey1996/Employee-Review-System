const employeeDB=require('../models/employees');
const reviewDB=require('../models/review');
module.exports.home=async function(req, res){
    if(!req.user){
        res.redirect('/employees/signin');
    }
    let employee=await employeeDB.findById(req.user._id);
    let rev=await reviewDB.find({
        to: req.user._id
    });
    var recipients=[];
    for(let i=0;i<employee.to.length;i++){
        let tmp=await employeeDB.findById(employee.to[i]);
        //console.log(employee.to[i]);
        recipients.push(tmp);
    }
    var reviews=[];

    for(let i=0;i<rev.length;i++){
        let tmp=await employeeDB.findById(rev[i].from);
        //console.log(tmp);
        let tmp2={
            name: tmp.name,
            review: rev[i].review
        };
        reviews.push(tmp2);
    }
    return res.render('home',{
        recipients: recipients,
        reviews: reviews
    });
}   