const express = require('express');
const router =express.Router();
const {demo,createGroup}=require("../controller/groups.controller");
const authenticate = require('../middleware/authenticate')



router.route('/demo').post(demo)
router.route('/createGroup').post(authenticate,createGroup)

module.exports=router