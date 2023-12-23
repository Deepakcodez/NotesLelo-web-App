const express = require('express');
const router =express.Router();
const {demo}=require("../controller/groups.controller");


router.route('/demo').get(demo)

module.exports=router