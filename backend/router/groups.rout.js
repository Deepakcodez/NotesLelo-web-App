const express = require('express');
const router =express.Router();
const {demo,createGroup}=require("../controller/groups.controller");


router.route('/demo').post(demo)
router.route('/crateGroup').post(createGroup)

module.exports=router