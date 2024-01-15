const express = require('express');
const router =express.Router();
const{ demo,addMessage,allMessages}= require("../controller/message.controller")

router.route('/demo').get(demo)
router.route('/addMessage').post(addMessage)
router.route('/allMessages').post(allMessages)


module.exports=router