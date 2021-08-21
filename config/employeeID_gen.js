const db = require('../config/mongoose');
const employeeDB=require('../models/employees');
    
module.exports.employeeID=function(){
    var query=employeeDB.find();
    var pre=12101000+query.count();
    return pre.toString();
}
