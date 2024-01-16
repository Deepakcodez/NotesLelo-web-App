const express = require('express');
const router =express.Router();
const {demo,addDemand}=require("../controller/demand.controller");
const authenticate = require('../middleware/authenticate')


router.route('/demo').get(demo)
router.route('/post').post(authenticate , addDemand)


module.exports=router