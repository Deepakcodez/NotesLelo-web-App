const express = require('express');
const router =express.Router();
const{ demo,addMessage}= require("../controller/message.controller")

router.route('/demo').get(demo)
router.route('/addMessage').post(addMessage)


module.exports=router