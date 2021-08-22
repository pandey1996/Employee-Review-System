const express=require('express');
const router=express.Router();
const reviews_controller=require('../controllers/reviews_controller');
const passport=require('passport');

router.get('/newReview/:id',passport.checkAuthentication,reviews_controller.newReview);

module.exports=router;