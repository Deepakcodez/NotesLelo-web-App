const express = require('express');
const router =express.Router();
const {usernotification}=require("../controller/notification.controller");
const authenticate = require('../middleware/authenticate')


router.route('/latest_notification').get(authenticate , usernotification)



module.exports=router