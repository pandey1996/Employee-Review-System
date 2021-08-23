const express=require('express');
const router=express.Router();
const passport=require('passport');
const admin_controller=require('../controllers/admins_controller');

router.get('/main',passport.checkAuthentication,admin_controller.adminPage);
router.get('/setReviewers',passport.checkAuthentication,admin_controller.setReviewers);

module.exports=router;