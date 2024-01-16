const express = require('express');
const router =express.Router();
const {demo}=require("../controller/demand.controller");
const authenticate = require('../middleware/authenticate')


router.route('/demo').get(demo)


module.exports=router