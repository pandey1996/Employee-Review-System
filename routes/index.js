const express=require('express');
const router=express.Router();


const home_controller=require('../controllers/home_controller');

router.get('/',home_controller.home);
router.use('/employees',require('./employees'));
router.use('/reviews',require('./review'));
module.exports=router;