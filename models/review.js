const mongoose=require('mongoose');

const reviewSchema=mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'EmployeeDB'
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'EmployeeDB'
    },
    review:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Review=mongoose.Model('Review',reviewSchema);

module.exports=Review;