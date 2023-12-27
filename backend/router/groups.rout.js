const express = require('express');
const router =express.Router();
const {demo,createGroup, allGroups}=require("../controller/groups.controller");
const authenticate = require('../middleware/authenticate')
const  headerAuth  = require('../middleware/headerAuth')



router.route('/demo').post(demo)
router.route('/create').post(authenticate,createGroup)
router.route('/all').get(allGroups)

module.exports=router