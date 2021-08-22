const employeeDB=require('../models/employees');
const reviewDB=require('../models/review');
module.exports.newReview=async function(req, res){
    let recipient=await employeeDB.findById(req.params.id);
    if(!recipient){
        req.flash('error','Recipient Not Valid');
        return res.redirect('back');
    }

    for(let i=0; i<recipient.from.length; i++){
        //console.log("voosl",id);
        if(recipient.from[i]==req.user.id){
            await reviewDB.create({
                to: recipient.id,
                from: req.user.id,
                review: req.query.newReview
            });
            return res.redirect('back');
        }
    }
    return res.redirect('back');
}