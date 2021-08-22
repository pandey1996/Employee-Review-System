const express=require('express');
const router=express.Router();
const employees_controller=require('../controllers/employees_controller');
const passport=require('passport');

router.get('/signIn',employees_controller.signIn);
router.get('/signup',employees_controller.signUp);
router.get('/signout',employees_controller.deleteSession);
router.post('/newEmployee',employees_controller.createUser);
router.post('/createsession',passport.authenticate('local',{
    failureRedirect: '/employees/signin',
    failureFlash: true
}),employees_controller.createSession);


module.exports=router;