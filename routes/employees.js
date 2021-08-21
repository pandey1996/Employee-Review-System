const express=require('express');
const router=express.Router();
const employees_controller=require('../controllers/employees_controller');

router.get('/signIn',employees_controller.signIn);
router.get('/signup',employees_controller.signUp);
router.post('/newEmployee',employees_controller.createUser);


module.exports=router;