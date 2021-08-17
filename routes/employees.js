const express=require('express');
const router=express.Router();
const employees_controller=require('../controllers/employees_controller');

router.get('/signup',employees_controller.signUp);

module.exports=router;